import {
  GraphQLNonNull,
  GraphQLID,
} from 'graphql';

import {
  fromGlobalId,
  mutationWithClientMutationId,
} from 'graphql-relay';

import {
  getUser,
  getGroup,
  disconnectUserFromGroup,
} from '../database';

import UserType from '../types/UserType';
import GroupType from '../types/GroupType';

export default mutationWithClientMutationId({
  name: 'DisconnectUserFromGroup',
  inputFields: {
    userId: { type: new GraphQLNonNull(GraphQLID) },
    groupId: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    removedUserID: {
      type: GraphQLID,
      resolve: ({localUserId}) => localUserId,
    },
    removedGroupID: {
      type: GraphQLID,
      resolve: ({localGroupId}) => localGroupId,
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
    disconnectUserFromGroup(localUserId, localGroupId);
    return { localUserId, localGroupId };
  },
});


