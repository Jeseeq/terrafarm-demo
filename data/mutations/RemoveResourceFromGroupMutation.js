import {
  GraphQLNonNull,
  GraphQLID,
} from 'graphql';

import {
  fromGlobalId,
  mutationWithClientMutationId,
} from 'graphql-relay';

import {getEndpoint} from '../types/registry';

import getItem from '../api/getItem';
import updateItem from '../api/updateItem';

import {ResourceType} from '../types/ResourceType';
import {GroupType} from '../types/GroupType';

const resourceEndpoint = getEndpoint(ResourceType);
const groupEndpoint = getEndpoint(GroupType);

export default mutationWithClientMutationId({
  name: 'RemoveResourceFromGroup',
  inputFields: {
    resourceId: { type: new GraphQLNonNull(GraphQLID) },
    groupId: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    removedGroupID: {
      type: GraphQLID,
      resolve: ({localGroupId}) => localGroupId,
    },
    removedResourceID: {
      type: GraphQLID,
      resolve: ({localResourceId}) => localResourceId,
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
    const groupIndex = resource.groups.findIndex(g => g.id === localGroupId);

    resource.groups.splice(groupIndex, 1);

    return await updateItem(resourceEndpoint, localResourceId, {
      groups: resource.groups,
    }).then(() => {
      return { localResourceId, localGroupId };
    });
  },
});

