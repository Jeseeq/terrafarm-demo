import {
  GraphQLNonNull,
  GraphQLID,
} from 'graphql';

import {
  fromGlobalId,
  cursorForObjectInConnection,
  mutationWithClientMutationId,
} from 'graphql-relay';

import {
  getResource,
  getGroup,
  connectResourceToGroup,
} from '../database';

import {ResourceType, ResourceEdge} from '../types/ResourceType';
import {GroupType, GroupEdge} from '../types/GroupType';

export default mutationWithClientMutationId({
  name: 'ConnectResourceToGroup',
  inputFields: {
    resourceId: { type: new GraphQLNonNull(GraphQLID) },
    groupId: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    groupEdge: {
      type: GroupEdge,
      resolve: ({localResourceId, localGroupId}) => {
        const resource = getResource(localResourceId);
        const group = getGroup(localGroupId);
        return {
          cursor: cursorForObjectInConnection(
            resource.groups.map(id => getGroup(id)),
            group
          ),
          node: group,
        };
      },
    },
    resourceEdge: {
      type: ResourceEdge,
      resolve: ({localGroupId, localResourceId}) => {
        const group = getGroup(localGroupId);
        const resource = getResource(localResourceId);
        return {
          cursor: cursorForObjectInConnection(
            group.resources.map(id => getResource(id)),
            resource
          ),
          node: resource,
        };
      },
    },
    resource: {
      type: ResourceType,
      resolve: ({localResourceId}) => getResource(localResourceId),
    },
    group: {
      type: GroupType,
      resolve: ({localGroupId}) => getGroup(localGroupId),
    },
  },
  mutateAndGetPayload: ({resourceId, groupId}) => {
    const localResourceId = fromGlobalId(resourceId).id;
    const localGroupId = fromGlobalId(groupId).id;
    connectResourceToGroup(localResourceId, localGroupId);
    return { localResourceId, localGroupId };
  },
});

