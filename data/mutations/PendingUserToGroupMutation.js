import {
  GraphQLNonNull,
  GraphQLID,
} from 'graphql';

import {
  fromGlobalId,
  offsetToCursor,
  mutationWithClientMutationId,
} from 'graphql-relay';

import {getEndpoint} from '../types/registry';

import getItem from '../api/getItem';
import updateItem from '../api/updateItem';

import {UserType, UserEdge} from '../types/UserType';
import {GroupType, GroupEdge} from '../types/GroupType';

export default mutationWithClientMutationId({
  name: 'PendingUserToGroup',
  inputFields: {
    userId: { type: new GraphQLNonNull(GraphQLID) },
    groupId: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    /* eslint eqeqeq: 0 */
    groupEdge: {
      type: GroupEdge,
      resolve: async ({localUserId, localGroupId}) => {
        const groupEndpoint = getEndpoint(GroupType);
        const user = await getItem(getEndpoint(UserType), localUserId);
        const groupPromises = user.groups_pending.map(g => getItem(groupEndpoint, g.id));
        const groupResults = await* groupPromises;
        const offset = groupResults.findIndex(g => g.id == localGroupId);
        const cursor = offsetToCursor(offset);
        return {
          cursor: cursor,
          node: groupResults[offset],
        };
      },
    },
    userEdge: {
      type: UserEdge,
      resolve: async ({localUserId, localGroupId}) => {
        const groupEndpoint = getEndpoint(GroupType);
        const group = await getItem(groupEndpoint, localGroupId);
        const userPromises = group.users_pending.map(r => getItem(getEndpoint(UserType), r.id));
        const userResults = await* userPromises;
        const offset = userResults.findIndex(r => r.id == localUserId);
        const cursor = offsetToCursor(offset);
        return {
          cursor: cursor,
          node: userResults[offset],
        };
      },
    },
    user: {
      type: UserType,
      resolve: async ({localUserId}) => await getItem(getEndpoint(UserType), localUserId),
    },
    group: {
      type: GroupType,
      resolve: async ({localGroupId}) => await getItem(getEndpoint(GroupType), localGroupId),
    },
  },
  mutateAndGetPayload: async ({userId, groupId}) => {
    const localUserId = fromGlobalId(userId).id;
    const localGroupId = fromGlobalId(groupId).id;
    const user = await getItem(getEndpoint(UserType), localUserId);
    user.groups_pending.push({id: localGroupId});

    return await updateItem(getEndpoint(UserType), localUserId, {
      groups_pending: user.groups_pending,
    }).then(() => {
      return { localUserId, localGroupId };
    });
  },
});

