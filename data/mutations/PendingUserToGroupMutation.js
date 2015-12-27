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

const userEndpoint = getEndpoint(UserType);
const groupEndpoint = getEndpoint(GroupType);

export default mutationWithClientMutationId({
  name: 'PendingUserToGroup',
  inputFields: {
    userId: { type: new GraphQLNonNull(GraphQLID) },
    groupId: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    groupEdge: {
      type: GroupEdge,
      resolve: async ({localUserId, localGroupId}) => {
        const user = await getItem(userEndpoint, localUserId);
        const groupPromises = user.groups_pending.map(g => getItem(groupEndpoint, g.id));
        const groupResults = await* groupPromises;
        const offset = groupResults.findIndex(g => g.id === localGroupId);
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
        const group = await getItem(groupEndpoint, localGroupId);
        const userPromises = group.users_pending.map(r => getItem(userEndpoint, r.id));
        const userResults = await* userPromises;
        const offset = userResults.findIndex(r => r.id === localUserId);
        const cursor = offsetToCursor(offset);
        return {
          cursor: cursor,
          node: userResults[offset],
        };
      },
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
  // ...
  mutateAndGetPayload: ({userId, groupId}) => {
    const localUserId = fromGlobalId(userId).id;
    const localGroupId = fromGlobalId(groupId).id;
    pendingUserToGroup(localUserId, localGroupId);
    return { localUserId, localGroupId };
  },
});

