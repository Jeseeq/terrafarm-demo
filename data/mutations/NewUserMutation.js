import {
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import {
  offsetToCursor,
  mutationWithClientMutationId,
} from 'graphql-relay';

import {getEndpoint} from '../types/registry';

import getItem from '../api/getItem';
import createItem from '../api/createItem';

import MasterType from '../types/MasterType';
import {UserType, UserEdge} from '../types/UserType';

const userEndpoint = getEndpoint(UserType);
const masterEndpoint = getEndpoint(MasterType);

export default mutationWithClientMutationId({
  name: 'NewUser',
  inputFields: {
    userName: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    userEdge: {
      type: UserEdge,
      resolve: async ({localUserId}) => {
        const master = await getItem(masterEndpoint, 1);
        const userPromises = master.users.map(u => getItem(userEndpoint, u.id));
        const userResults = await* userPromises;
        const offset = userResults.findIndex(u => u.id === localUserId);
        const cursor = offsetToCursor(offset);
        return {
          cursor: cursor,
          node: userResults[offset],
        };
      },
    },
    master: {
      type: MasterType,
      resolve: async () => await getItem(masterEndpoint, 1),
    },
  },
  mutateAndGetPayload: async ({userName}) => {
    return await createItem(userEndpoint, {
      name: userName,
      resources: [],
      groups: [],
      groups_pending: [],
      viewers: [],
      masters: [{id: 1}],
    }).then((newUser) => {
      return {localUserId: newUser.id};
    });
  },
});

