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

import AddResourceToGroupMutation from './mutations/AddResourceToGroupMutation';
import AddUserToGroupMutation from './mutations/AddUserToGroupMutation';
import AuthenticateViewerMutation from './mutations/AuthenticateViewerMutation';
import NewGroupMutation from './mutations/NewGroupMutation';
import NewResourceMutation from './mutations/NewResourceMutation';
import NewUserMutation from './mutations/NewUserMutation';
import PendingResourceToGroupMutation from './mutations/PendingResourceToGroupMutation';
import PendingUserToGroupMutation from './mutations/PendingUserToGroupMutation';
import RemovePendingResourceToGroupMutation from './mutations/RemovePendingResourceToGroupMutation';
import RemovePendingUserToGroupMutation from './mutations/RemovePendingUserToGroupMutation';
import RemoveResourceFromGroupMutation from './mutations/RemoveResourceFromGroupMutation';
import RemoveUserFromGroupMutation from './mutations/RemoveUserFromGroupMutation';
import UpdateGroupMutation from './mutations/UpdateGroupMutation';
import UpdateResourceMutation from './mutations/UpdateResourceMutation';

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
    addResourceToGroup: AddResourceToGroupMutation,
    addUserToGroup: AddUserToGroupMutation,
    authenticateViewer: AuthenticateViewerMutation,
    newGroup: NewGroupMutation,
    newResource: NewResourceMutation,
    newUser: NewUserMutation,
    pendingResourceToGroup: PendingResourceToGroupMutation,
    pendingUserToGroup: PendingUserToGroupMutation,
    removePendingResourceToGroup: RemovePendingResourceToGroupMutation,
    removePendingUserToGroup: RemovePendingUserToGroupMutation,
    removeResourceFromGroup: RemoveResourceFromGroupMutation,
    removeUserFromGroup: RemoveUserFromGroupMutation,
    updateGroup: UpdateGroupMutation,
    updateResource: UpdateResourceMutation,
  }),
});

export const Schema = new GraphQLSchema({
  mutation: Mutation,
  query: Root,
});


