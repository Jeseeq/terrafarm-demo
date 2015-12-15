import {
  GraphQLNonNull,
  GraphQLID,
} from 'graphql';

import {
  fromGlobalId,
  mutationWithClientMutationId,
} from 'graphql-relay';

import {
  getResource,
  getGroup,
  disconnectResourceFromGroup,
} from '../database';

import {ResourceType} from '../types/ResourceType';
import {GroupType} from '../types/GroupType';

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
    disconnectResourceFromGroup(localResourceId, localGroupId);
    return { localResourceId, localGroupId };
  },
});

