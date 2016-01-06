import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {fromGlobalId} from 'graphql-relay';

import {getEndpoint} from './types/registry';

import getItem from './api/getItem';

import {GroupType} from './types/GroupType';
import MasterType from './types/MasterType';
import {UserType} from './types/UserType';
import {ResourceType} from './types/ResourceType';
import ViewerType from './types/ViewerType';
import {nodeField} from './types/node';

import AuthenticateViewerMutation from './mutations/AuthenticateViewerMutation';
import CancelPendingResourceToGroupMutation from './mutations/CancelPendingResourceToGroupMutation';
import ConnectUserToGroupMutation from './mutations/ConnectUserToGroupMutation';
import ConnectResourceToGroupMutation from './mutations/ConnectResourceToGroupMutation';
import DisconnectUserFromGroupMutation from './mutations/DisconnectUserFromGroupMutation';
import DisconnectResourceFromGroupMutation from './mutations/DisconnectResourceFromGroupMutation';
import NewUserMutation from './mutations/NewUserMutation';
import NewResourceMutation from './mutations/NewResourceMutation';
import NewGroupMutation from './mutations/NewGroupMutation';
import PendingUserToGroupMutation from './mutations/PendingUserToGroupMutation';
import PendingResourceToGroupMutation from './mutations/PendingResourceToGroupMutation';
import RemovePendingUserToGroupMutation from './mutations/RemovePendingUserToGroupMutation';
import UpdateResourceMutation from './mutations/UpdateResourceMutation';
import UpdateGroupMutation from './mutations/UpdateGroupMutation';

const Root = new GraphQLObjectType({
  name: 'Root',
  fields: {
    group: {
      type: GroupType,
      args: {
        groupId: { type: GraphQLString },
      },
      resolve: async (_, {groupId}) => {
        const id = fromGlobalId(groupId).id;
        return await getItem(getEndpoint(GroupType), id);
      },
    },
    master: {
      type: MasterType,
      resolve: async () => await getItem(getEndpoint(MasterType), 1),
    },
    resource: {
      type: ResourceType,
      args: {
        resourceId: { type: GraphQLString },
      },
      resolve: async (_, {resourceId}) => {
        const id = fromGlobalId(resourceId).id;
        return await getItem(getEndpoint(ResourceType), id);
      },
    },
    user: {
      type: UserType,
      args: {
        userId: { type: GraphQLString },
      },
      resolve: async (_, {userId}) => {
        const id = fromGlobalId(userId).id;
        return await getItem(getEndpoint(UserType), id);
      },
    },
    viewer: {
      type: ViewerType,
      resolve: async () => await getItem(getEndpoint(ViewerType), 1),
    },
    node: nodeField,
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    authenticateViewer: AuthenticateViewerMutation,
    cancelPendingResourceToGroup: CancelPendingResourceToGroupMutation,
    connectUserToGroup: ConnectUserToGroupMutation,
    connectResourceToGroup: ConnectResourceToGroupMutation,
    disconnectUserFromGroup: DisconnectUserFromGroupMutation,
    disconnectResourceFromGroup: DisconnectResourceFromGroupMutation,
    newUser: NewUserMutation,
    newResource: NewResourceMutation,
    newGroup: NewGroupMutation,
    pendingUserToGroup: PendingUserToGroupMutation,
    pendingResourceToGroup: PendingResourceToGroupMutation,
    removePendingUserToGroup: RemovePendingUserToGroupMutation,
    updateResource: UpdateResourceMutation,
    updateGroup: UpdateGroupMutation,
  }),
});

export const Schema = new GraphQLSchema({
  mutation: Mutation,
  query: Root,
});


