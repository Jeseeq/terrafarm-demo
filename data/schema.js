import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {fromGlobalId} from 'graphql-relay';

import {getEndpoint} from './types/registry';

import getItem from './api/getItem';

import {nodeField} from './types/node';
import {UserType} from './types/UserType';
import {ResourceType} from './types/ResourceType';
import {GroupType} from './types/GroupType';
import MasterType from './types/MasterType';
import ViewerType from './types/ViewerType';

import AuthenticateViewerMutation from './mutations/AuthenticateViewerMutation';
import NewUserMutation from './mutations/NewUserMutation';
import NewResourceMutation from './mutations/NewResourceMutation';
import NewGroupMutation from './mutations/NewGroupMutation';
import UpdateResourceMutation from './mutations/UpdateResourceMutation';
import UpdateGroupMutation from './mutations/UpdateGroupMutation';
import PendingUserToGroupMutation from './mutations/PendingUserToGroupMutation';
import PendingResourceToGroupMutation from './mutations/PendingResourceToGroupMutation';
import CancelPendingUserToGroupMutation from './mutations/CancelPendingUserToGroupMutation';
import CancelPendingResourceToGroupMutation from './mutations/CancelPendingResourceToGroupMutation';
import ConnectUserToGroupMutation from './mutations/ConnectUserToGroupMutation';
import ConnectResourceToGroupMutation from './mutations/ConnectResourceToGroupMutation';
import DisconnectUserFromGroupMutation from './mutations/DisconnectUserFromGroupMutation';
import DisconnectResourceFromGroupMutation from './mutations/DisconnectResourceFromGroupMutation';

const Root = new GraphQLObjectType({
  name: 'Root',
  fields: {
    master: {
      type: MasterType,
      resolve: async () => await getItem(getEndpoint(MasterType), 1),
    },
    viewer: {
      type: ViewerType,
      resolve: async () => await getItem(getEndpoint(ViewerType), 1),
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
    node: nodeField,
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    authenticateViewer: AuthenticateViewerMutation,
    newUser: NewUserMutation,
    newResource: NewResourceMutation,
    newGroup: NewGroupMutation,
    updateResource: UpdateResourceMutation,
    updateGroup: UpdateGroupMutation,
    pendingUserToGroup: PendingUserToGroupMutation,
    pendingResourceToGroup: PendingResourceToGroupMutation,
    cancelPendingUserToGroup: CancelPendingUserToGroupMutation,
    cancelPendingResourceToGroup: CancelPendingResourceToGroupMutation,
    connectUserToGroup: ConnectUserToGroupMutation,
    connectResourceToGroup: ConnectResourceToGroupMutation,
    disconnectUserFromGroup: DisconnectUserFromGroupMutation,
    disconnectResourceFromGroup: DisconnectResourceFromGroupMutation,
  }),
});

export const Schema = new GraphQLSchema({
  query: Root,
  mutation: Mutation,
});


