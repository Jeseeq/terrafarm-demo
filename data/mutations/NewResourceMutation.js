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

import {getEndpoint} from '../types/registry';

import getItem from '../api/getItem';
import createItem from '../api/createItem';
/*
import {
  getUser,
  getResource,
  getMaster,
  createResource,
} from '../database';
*/
import {UserType} from '../types/UserType';
import {ResourceType, ResourceEdge} from '../types/ResourceType';
import MasterType from '../types/MasterType';

const resourceEndpoint = getEndpoint(ResourceType);
const masterEndpoint = getEndpoint(MasterType);

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
        const masters = getItem(masterEndpoint);
        const resource = getItem(resourceEndpoint, localResourceId);
        return {
          cursor: cursorForObjectInConnection(
            masters[0].resources.map(r => getItem(resourceEndpoint, r.id)),
            resource
          ),
          node: resource,
        };
      },
    },
    user: {
      type: UserType,
      resolve: ({localUserId}) => getItem(getEndpoint(UserType), localUserId),
    },
    master: {
      type: MasterType,
      resolve: () => getItem(masterEndpoint),
    },
  },
  mutateAndGetPayload: ({userId, resourceName}) => {
    const localUserId = fromGlobalId(userId).id;
    // createItem

    // const localResourceId = createResource(localUserId, resourceName);
    return {localUserId, localResourceId};
  },
});

