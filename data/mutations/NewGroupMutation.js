import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
} from 'graphql';

import {
  fromGlobalId,
  cursorForObjectInConnection,
  mutationWithClientMutationId,
} from 'graphql-relay';

import {
  getUser,
  getGroup,
  getMaster,
  createGroup,
} from '../database';

import {UserType} from '../types/UserType';
import {GroupEdge} from '../types/GroupType';
import MasterType from '../types/MasterType';

export default mutationWithClientMutationId({
  name: 'NewGroup',
  inputFields: {
    userId: { type: new GraphQLNonNull(GraphQLID) },
    groupName: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    groupEdgeOnMaster: {
      type: GroupEdge,
      resolve: ({localGroupId}) => {
        var master = getMaster();
        var group = getGroup(localGroupId);
        return {
          cursor: cursorForObjectInConnection(
            master.groups.map(id => getGroup(id)),
            group
          ),
          node: group,
        };
      }
    },
    groupEdgeOnUser: {
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
        };
      }
    },
    user: {
      type: UserType,
      resolve: ({localUserId}) => getUser(localUserId),
    },
    master: {
      type: MasterType,
      resolve: () => getMaster(),
    }
  },
  mutateAndGetPayload: ({userId, groupName}) => {
    var localUserId = fromGlobalId(userId).id;
    var localGroupId = createGroup(localUserId, groupName);
    return {localUserId, localGroupId};
  },
});

