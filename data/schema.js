import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {fromGlobalId} from 'graphql-relay';

import {getEndpoint} from './types/registry';

import getItem from './api/getItem';
/*
import {
  getUser,
  getResource,
  getGroup,
  getMaster,
  getViewer,
} from './database';
*/
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
import RenameResourceMutation from './mutations/RenameResourceMutation';
import RenameGroupMutation from './mutations/RenameGroupMutation';
import PendingUserToGroupMutation from './mutations/PendingUserToGroupMutation';
import CancelPendingUserToGroupMutation from './mutations/CancelPendingUserToGroupMutation';
import ConnectUserToGroupMutation from './mutations/ConnectUserToGroupMutation';
import ConnectResourceToGroupMutation from './mutations/ConnectResourceToGroupMutation';
import DisconnectUserFromGroupMutation from './mutations/DisconnectUserFromGroupMutation';
import DisconnectResourceFromGroupMutation from './mutations/DisconnectResourceFromGroupMutation';

const Root = new GraphQLObjectType({
  name: 'Root',
  fields: {
    master: {
      type: MasterType,
      resolve: () => getItem(getEndpoint(MasterType)),
    },
    viewer: {
      type: ViewerType,
      resolve: () => getItem(getEndpoint(ViewerType)),
    },
    user: {
      type: UserType,
      args: {
        userId: { type: GraphQLString },
      },
      resolve: (_, {userId}) => {
        const id = fromGlobalId(userId).id;
        return getItem(getEndpoint(UserType), id);
      },
    },
    resource: {
      type: ResourceType,
      args: {
        resourceId: { type: GraphQLString },
      },
      resolve: (_, {resourceId}) => {
        const id = fromGlobalId(resourceId).id;
        return getItem(getEndpoint(ResourceType), id);
      },
    },
    group: {
      type: GroupType,
      args: {
        groupId: { type: GraphQLString },
      },
      resolve: (_, {groupId}) => {
        const id = fromGlobalId(groupId).id;
        return getItem(getEndpoint(GroupType), id);
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
    renameResource: RenameResourceMutation,
    renameGroup: RenameGroupMutation,
    pendingUserToGroup: PendingUserToGroupMutation,
    cancelPendingUserToGroup: CancelPendingUserToGroupMutation,
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


