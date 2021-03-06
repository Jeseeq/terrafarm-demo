import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
} from 'graphql';

import {
  fromGlobalId,
  offsetToCursor,
  mutationWithClientMutationId,
} from 'graphql-relay';

import {getEndpoint} from '../types/registry';

import getItem from '../api/getItem';
import createItem from '../api/createItem';

import {UserType} from '../types/UserType';
import {GroupType, GroupEdge} from '../types/GroupType';
import MasterType from '../types/MasterType';

const groupEndpoint = getEndpoint(GroupType);
const masterEndpoint = getEndpoint(MasterType);
const userEndpoint = getEndpoint(UserType);

export default mutationWithClientMutationId({
  name: 'NewGroup',
  inputFields: {
    userId: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    category: { type: new GraphQLNonNull(GraphQLString) },
  },
  /* eslint eqeqeq: 0 */
  outputFields: {
    groupEdge: {
      type: GroupEdge,
      resolve: async ({localGroupId}) => {
        const master = await getItem(masterEndpoint, 1);
        const groupPromises = master.groups.map(r => getItem(groupEndpoint, r.id));
        const groupResults = await* groupPromises;
        const offset = groupResults.findIndex(g => g.id == localGroupId);
        const cursor = offsetToCursor(offset);
        return {
          cursor: cursor,
          node: groupResults[offset],
        };
      },
    },
    user: {
      type: UserType,
      resolve: async ({localUserId}) => await getItem(userEndpoint, localUserId),
    },
    master: {
      type: MasterType,
      resolve: async () => await getItem(masterEndpoint, 1),
    },
  },
  mutateAndGetPayload: async ({userId, name, description, category}) => {
    const localUserId = fromGlobalId(userId).id;

    return await createItem(groupEndpoint, {
      name,
      description,
      category,
      users: [{id: localUserId}],
      resources: [],
      masters: [{id: 1}],
    }).then(result => {
      return {
        localGroupId: result.id,
        localUserId,
      };
    });
  },
});

