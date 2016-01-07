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
import {ResourceType, ResourceEdge} from '../types/ResourceType';
import MasterType from '../types/MasterType';

const resourceEndpoint = getEndpoint(ResourceType);
const masterEndpoint = getEndpoint(MasterType);
const userEndpoint = getEndpoint(UserType);

export default mutationWithClientMutationId({
  name: 'NewResource',
  inputFields: {
    userId: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    category: { type: new GraphQLNonNull(GraphQLString) },
  },
  /* eslint eqeqeq: 0 */
  outputFields: {
    resourceEdge: {
      type: ResourceEdge,
      resolve: async ({localResourceId}) => {
        const master = await getItem(masterEndpoint, 1);
        const resourcePromises = master.resources.map(r => getItem(resourceEndpoint, r.id));
        const resourceResults = await* resourcePromises;
        const offset = resourceResults.findIndex(r => r.id == localResourceId);
        const cursor = offsetToCursor(offset);
        return {
          cursor: cursor,
          node: resourceResults[offset],
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

    return await createItem(resourceEndpoint, {
      name,
      description,
      category,
      users: [{id: localUserId}],
      groups: [],
      masters: [{id: 1}],
    }).then(result => {
      return {
        localResourceId: result.id,
        localUserId,
      };
    });
  },
});

