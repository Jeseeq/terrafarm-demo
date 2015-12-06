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
  getResource,
  renameResource,
} from '../database';

import {ResourceType} from '../types/ResourceType';

export default mutationWithClientMutationId({
  name: 'RenameResource',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    resource: {
      type: ResourceType,
      resolve: ({localResourceId}) => getResource(localResourceId),
    }
  },
  mutateAndGetPayload: ({id, name}) => {
    var localResourceId = fromGlobalId(id).id;
    renameResource(localResourceId, name);
    return {localResourceId};
  },
});

