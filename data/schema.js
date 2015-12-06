import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {fromGlobalId} from 'graphql-relay';

import {
  getUser,
  getResource,
  getGroup,
  getMaster,
  getViewer,
} from './database';

import {nodeField} from './types/node';
import {UserType, UserConnection, UserEdge} from './types/UserType';
import {ResourceType, ResourceConnection, ResourceEdge} from './types/ResourceType';
import {GroupType, GroupConnection, GroupEdge} from './types/GroupType';
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

var Root = new GraphQLObjectType({
  name: 'Root',
  fields: {
    master: {
      type: MasterType,
      resolve: getMaster,
    },
    viewer: {
      type: ViewerType,
      resolve: getViewer,
    },
    user: {
      type: UserType,
      args: {
        userId: { type: GraphQLString, },
      },
      resolve: (_, {userId}) => {
        var id = fromGlobalId(userId).id;
        return getUser(id);
      },
    },
    resource: {
      type: ResourceType,
      args: {
        resourceId: { type: GraphQLString, },
      },
      resolve: (_, {resourceId}) => {
        var id = fromGlobalId(resourceId).id;
        return getResource(id);
      },
    },
    group: {
      type: GroupType,
      args: {
        groupId: { type: GraphQLString, },
      },
      resolve: (_, {groupId}) => {
        var id = fromGlobalId(groupId).id;
        return getGroup(id);
      },
    },
    node: nodeField,
  },
});

var Mutation = new GraphQLObjectType({
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

export var Schema = new GraphQLSchema({
  query: Root,
  mutation: Mutation,
});


