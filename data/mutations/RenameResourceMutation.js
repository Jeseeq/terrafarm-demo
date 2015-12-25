import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
} from 'graphql';

import {
  fromGlobalId,
  mutationWithClientMutationId,
} from 'graphql-relay';

import {getEndpoint} from '../types/registry';

import getItem from '../api/getItem';
import updateItem from '../api/updateItem';

import {ResourceType} from '../types/ResourceType';

const resourceEndpoint = getEndpoint(ResourceType);

export default mutationWithClientMutationId({
  name: 'RenameResource',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    resource: {
      type: ResourceType,
      resolve: async ({localResourceId}) => await getItem(resourceEndpoint, localResourceId),
    },
  },
  mutateAndGetPayload: async ({id, name}) => {
    const localResourceId = fromGlobalId(id).id;

    return await updateItem(resourceEndpoint, localResourceId, {
      name,
    }).then((result) => {
      return {localResourceId: result.id};
    });
  },
});

