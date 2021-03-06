import {
  GraphQLID,
  GraphQLNonNull,
} from 'graphql';

import {
  fromGlobalId,
  mutationWithClientMutationId,
} from 'graphql-relay';

import {getEndpoint} from '../types/registry';

import getItem from '../api/getItem';
import updateItem from '../api/updateItem';

import {UserType} from '../types/UserType';
import {GroupType} from '../types/GroupType';

const userEndpoint = getEndpoint(UserType);
const groupEndpoint = getEndpoint(GroupType);

export default mutationWithClientMutationId({
  name: 'RemovePendingUserToGroup',
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
      resolve: async ({localUserId}) => await getItem(userEndpoint, localUserId),
    },
    group: {
      type: GroupType,
      resolve: async ({localGroupId}) => await getItem(groupEndpoint, localGroupId),
    },
  },
  /* eslint eqeqeq: 0 */
  mutateAndGetPayload: async ({userId, groupId}) => {
    const localUserId = fromGlobalId(userId).id;
    const localGroupId = fromGlobalId(groupId).id;
    const user = await getItem(userEndpoint, localUserId);
    const groupIndex = user.groups_pending.findIndex(g => g.id == localGroupId);

    user.groups_pending.splice(groupIndex, 1);

    return await updateItem(userEndpoint, localUserId, {
      groups_pending: user.groups_pending,
    }).then(() => {
      return { localUserId, localGroupId };
    });
  },
});

