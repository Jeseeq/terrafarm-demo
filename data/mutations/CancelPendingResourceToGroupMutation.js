import {
  GraphQLID,
  GraphQLNonNull,
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
  name: 'CancelPendingResourceToGroup',
  inputFields: {
    resourceId: { type: new GraphQLNonNull(GraphQLID) },
    groupId: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    removedResourceID: {
      type: GraphQLID,
      resolve: ({localResourceId}) => localResourceId,
    },
    removedGroupID: {
      type: GraphQLID,
      resolve: ({localGroupId}) => localGroupId,
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
    const groupIndex = resource.groups_pending.findIndex(g => g.id === localGroupId);

    resource.groups_pending.splice(groupIndex, 1);

    return await updateItem(resourceEndpoint, localResourceId, {
      groups_pending: resource.groups_pending,
    }).then(() => {
      return { localResourceId, localGroupId };
    });
  },
});


