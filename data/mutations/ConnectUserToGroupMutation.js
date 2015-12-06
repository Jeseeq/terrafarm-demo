import {
  GraphQLNonNull,
  GraphQLID,
} from 'graphql';

import {
  fromGlobalId,
  cursorForObjectInConnection,
  mutationWithClientMutationId,
} from 'graphql-relay';

import {
  getUser,
  getGroup,
  connectUserToGroup,
} from '../database';

import {UserType, UserEdge} from '../types/UserType';
import {GroupType, GroupEdge} from '../types/GroupType';

export default mutationWithClientMutationId({
  name: 'ConnectUserToGroup',
  inputFields: {
    userId: { type: new GraphQLNonNull(GraphQLID) },
    groupId: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    groupEdge: {
      type: GroupEdge,
      resolve: ({localUserId, localGroupId}) => {
        var user = getUser(localUserId);
        var group = getGroup(localGroupId);
        return {
          cursor: cursorForObjectInConnection(
            user.groups.map(id => getGroup(id)), 
            group
          ),
          node: group,
        }
      },
    },
    userEdge: {
      type: UserEdge,
      resolve: ({localGroupId, localUserId}) => {
        var group = getGroup(localGroupId);
        var user = getUser(localUserId);
        return {
          cursor: cursorForObjectInConnection(
            group.users.map(id => getUser(id)),
            user
          ),
          node: user,
        };
      }
    },
    user: {
      type: UserType,
      resolve: ({localUserId}) => getUser(localUserId),
    },
    group: {
      type: GroupType,
      resolve: ({localGroupId}) => getGroup(localGroupId),
    },
  },
  mutateAndGetPayload: ({userId, groupId}) => {
    var localUserId = fromGlobalId(userId).id;
    var localGroupId = fromGlobalId(groupId).id;
    connectUserToGroup(localUserId, localGroupId);
    return { localUserId, localGroupId };
  },
});
