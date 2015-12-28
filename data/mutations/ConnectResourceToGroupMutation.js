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

import {ResourceType, ResourceEdge} from '../types/ResourceType';
import {GroupType, GroupEdge} from '../types/GroupType';

const resourceEndpoint = getEndpoint(ResourceType);
const groupEndpoint = getEndpoint(GroupType);

export default mutationWithClientMutationId({
  name: 'ConnectResourceToGroup',
  inputFields: {
    resourceId: { type: new GraphQLNonNull(GraphQLID) },
    groupId: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    groupEdge: {
      type: GroupEdge,
      resolve: async ({localResourceId, localGroupId}) => {
        const resource = await getItem(resourceEndpoint, localResourceId);
        const groupPromises = resource.groups.map(g => getItem(groupEndpoint, g.id));
        const groupResults = await* groupPromises;
        const offset = groupResults.findIndex(g => g.id === localGroupId);
        const cursor = offsetToCursor(offset);
        return {
          cursor: cursor,
          node: groupResults[offset],
        };
      },
    },
    resourceEdge: {
      type: ResourceEdge,
      resolve: async ({localGroupId, localResourceId}) => {
        const group = await getItem(groupEndpoint, localGroupId);
        const resourcePromises = group.resources.map(r => getItem(resourceEndpoint, r.id));
        const resourceResults = await* resourcePromises;
        const offset = resourceResults.findIndex(r => r.id === localResourceId);
        const cursor = offsetToCursor(offset);
        return {
          cursor: cursor,
          node: resourceResults[offset],
        };
      },
    },
    resource: {
      type: ResourceType,
      resolve: async ({localResourceId}) => await getItem(resourceEndpoint, localResourceId),
    },
    group: {
      type: GroupType,
      resolve: async ({localGroupId}) => await getItem(groupEndpoint, localGroupId),
    },
  },
  mutateAndGetPayload: async ({resourceId, groupId}) => {
    const localResourceId = fromGlobalId(resourceId).id;
    const localGroupId = fromGlobalId(groupId).id;
    const resource = await getItem(resourceEndpoint, localResourceId);
    resource.groups.push({id: localGroupId});

    return await updateItem(resourceEndpoint, localResourceId, {
      groups: resource.groups,
    }).then(() => {
      return { localResourceId, localGroupId };
    });
  },
});

