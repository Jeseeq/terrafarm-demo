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
  getUser,
  getResource,
  getMaster,
  createResource,
} from '../database';

import {UserType} from '../types/UserType';
import {ResourceEdge} from '../types/ResourceType';
import MasterType from '../types/MasterType';

export default mutationWithClientMutationId({
  name: 'NewResource',
  inputFields: {
    userId: { type: new GraphQLNonNull(GraphQLID) },
    resourceName: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    resourceEdge: {
      type: ResourceEdge,
      resolve: ({localResourceId}) => {
        const master = getMaster();
        const resource = getResource(localResourceId);
        return {
          cursor: cursorForObjectInConnection(
            master.resources.map(id => getResource(id)),
            resource
          ),
          node: resource,
        };
      },
    },
    user: {
      type: UserType,
      resolve: ({localUserId}) => getUser(localUserId),
    },
    master: {
      type: MasterType,
      resolve: () => getMaster(),
    },
  },
  mutateAndGetPayload: ({userId, resourceName}) => {
    const localUserId = fromGlobalId(userId).id;
    const localResourceId = createResource(localUserId, resourceName);
    return {localUserId, localResourceId};
  },
});

