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
  name: 'DisconnectResourceFromGroup',
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
  // ...
  mutateAndGetPayload: ({resourceId, groupId}) => {
    const localResourceId = fromGlobalId(resourceId).id;
    const localGroupId = fromGlobalId(groupId).id;
    disconnectResourceFromGroup(localResourceId, localGroupId);
    return { localResourceId, localGroupId };
  },
});

