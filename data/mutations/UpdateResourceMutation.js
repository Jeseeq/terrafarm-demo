import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLInputObjectType,
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
  name: 'UpdateResource',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    attributes: {
      type: new GraphQLInputObjectType({
        name: 'attributes',
        fields: {
          name: { type: GraphQLString },
          description: { type: GraphQLString },
          category: { type: GraphQLString },
        },
      }),
    },
  },
  outputFields: {
    resource: {
      type: ResourceType,
      resolve: async ({localResourceId}) => await getItem(resourceEndpoint, localResourceId),
    },
  },
  mutateAndGetPayload: async ({id, attributes}) => {
    const localResourceId = fromGlobalId(id).id;

    return await updateItem(resourceEndpoint, localResourceId, attributes)
      .then(result => {
        return {localResourceId: result.id};
      });
  },
});


