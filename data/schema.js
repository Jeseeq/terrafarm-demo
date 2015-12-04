import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  cursorForObjectInConnection,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay';

import {
  Master,
  Viewer,
  User,
  Resource,
  Group,
  authenticateViewer,
  getMaster,
  getViewer,
  getUser,
  getResource,
  getGroup,
  createUser,
  createResource,
  createGroup,
  renameResource,
  renameGroup,
  pendingUserToGroup,
  cancelPendingUserToGroup,
  connectUserToGroup,
  connectionResourceToGroup,
  disconnectUserFromGroup,
  disconnectionResourceFromGroup,
} from './database';

var {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    var {type, id} = fromGlobalId(globalId);
    if (type === 'Master') {
      return getMaster();
    } else if (type === 'Viewer') {
      return getViewer();
    } else if (type === 'User') {
      return getUser(id);
    } else if (type === 'Resource') {
      return getResource(id);
    } else if (type === 'Group') {
      return getGroup(id);
    } else {
      return null;
    }
  },
  (obj) => {
    if (obj instanceof Master) {
      return GraphQLMaster;
    } else if (obj instanceof Viewer) {
      return GraphQLViewer;
    } else if (obj instanceof User) {
      return GraphQLUser;
    } else if (obj instanceof Resource) {
      return GraphQLResource;
    } else if (obj instanceof Group) {
      return GraphQLGroup;
    } else {
      return null;
    }
  }
);


/* ****************************************************************************
 * ****************************************************************************
 * Object Types
 * ***************************************************************************/

import {
  GraphQLUser,
  UserConnection,
  GraphQLUserEdge,
} from './objects/GraphQLUser';

import {
  GraphQLResource,
  ResourceConnection,
  GraphQLResourceEdge,
} from './objects/GraphQLResource';

import {
  GraphQLGroup,
  GroupConnection,
  GraphQLGroupEdge,
} from './objects/GraphQLGroup';

import {GraphQLMaster} from './objects/GraphQLMaster';
import {GraphQLViewer} from './objects/GraphQLViewer';

var Root = new GraphQLObjectType({
  name: 'Root',
  fields: {
    master: {
      type: GraphQLMaster,
      resolve: getMaster,
    },
    viewer: {
      type: GraphQLViewer,
      resolve: getViewer,
    },
    user: {
      type: GraphQLUser,
      args: {
        userId: { type: GraphQLString, },
      },
      resolve: (_, {userId}) => {
        var id = fromGlobalId(userId).id;
        return getUser(id);
      },
    },
    resource: {
      type: GraphQLResource,
      args: {
        resourceId: { type: GraphQLString, },
      },
      resolve: (_, {resourceId}) => {
        var id = fromGlobalId(resourceId).id;
        return getResource(id);
      },
    },
    group: {
      type: GraphQLGroup,
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


/* ****************************************************************************
 * ****************************************************************************
 * Mutations
 * ***************************************************************************/

var GraphQLAuthenticateViewerMutation = mutationWithClientMutationId({
  name: 'AuthenticateViewer',
  inputFields: {
    userId: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    user: {
      type: GraphQLUser,
      resolve: ({localUserId}) => getUser(localUserId),
    },
    viewer: {
      type: GraphQLViewer,
      resolve: () => getViewer(),
    }
  },
  mutateAndGetPayload: ({userId}) => {
    var localUserId = fromGlobalId(userId).id;
    authenticateViewer(localUserId);
    return {localUserId};
  },
});

var GraphQLNewUserMutation = mutationWithClientMutationId({
  name: 'NewUser',
  inputFields: {
    userName: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    userEdge: {
      type: GraphQLUserEdge,
      resolve: ({localUserId}) => {
        var master = getMaster();
        var user = getUser(localUserId);
        return {
          cursor: cursorForObjectInConnection(
            master.users.map(id => getUser(id)),
            user
          ),
          node: user,
        };
      }
    },
    master: {
      type: GraphQLMaster,
      resolve: () => getMaster(),
    }
  },
  mutateAndGetPayload: ({userName}) => {
    var localUserId = createUser(userName);
    return {localUserId};
  },
});

var GraphQLNewResourceMutation = mutationWithClientMutationId({
  name: 'NewResource',
  inputFields: {
    userId: { type: new GraphQLNonNull(GraphQLID) },
    resourceName: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    resourceEdgeOnMaster: {
      type: GraphQLResourceEdge,
      resolve: ({localResourceId}) => {
        var master = getMaster();
        var resource = getResource(localResourceId);
        return {
          cursor: cursorForObjectInConnection(
            master.resources.map(id => getResource(id)),
            resource
          ),
          node: resource,
        };
      }
    },
    resourceEdgeOnUser: {
      type: GraphQLResourceEdge,
      resolve: ({localUserId, localResourceId}) => {
        var user = getUser(localUserId);
        var resource = getResource(localResourceId);
        return {
          cursor: cursorForObjectInConnection(
            user.resources.map(id => getResource(id)),
            resource
          ),
          node: resource,
        };
      }
    },
    user: {
      type: GraphQLUser,
      resolve: ({localUserId}) => getUser(localUserId),
    },
    master: {
      type: GraphQLMaster,
      resolve: () => getMaster(),
    }
  },
  mutateAndGetPayload: ({userId, resourceName}) => {
    var localUserId = fromGlobalId(userId).id;
    var localResourceId = createResource(localUserId, resourceName);
    return {localUserId, localResourceId};
  },
});

var GraphQLNewGroupMutation = mutationWithClientMutationId({
  name: 'NewGroup',
  inputFields: {
    userId: { type: new GraphQLNonNull(GraphQLID) },
    groupName: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    groupEdgeOnMaster: {
      type: GraphQLGroupEdge,
      resolve: ({localGroupId}) => {
        var master = getMaster();
        var group = getGroup(localGroupId);
        return {
          cursor: cursorForObjectInConnection(
            master.groups.map(id => getGroup(id)),
            group
          ),
          node: group,
        };
      }
    },
    groupEdgeOnUser: {
      type: GraphQLGroupEdge,
      resolve: ({localUserId, localGroupId}) => {
        var user = getUser(localUserId);
        var group = getGroup(localGroupId);
        return {
          cursor: cursorForObjectInConnection(
            user.groups.map(id => getGroup(id)),
            group
          ),
          node: group,
        };
      }
    },
    user: {
      type: GraphQLUser,
      resolve: ({localUserId}) => getUser(localUserId),
    },
    master: {
      type: GraphQLMaster,
      resolve: () => getMaster(),
    }
  },
  mutateAndGetPayload: ({userId, groupName}) => {
    var localUserId = fromGlobalId(userId).id;
    var localGroupId = createGroup(localUserId, groupName);
    return {localUserId, localGroupId};
  },
});

var GraphQLRenameResourceMutation = mutationWithClientMutationId({
  name: 'RenameResource',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    resource: {
      type: GraphQLResource,
      resolve: ({localResourceId}) => getResource(localResourceId),
    }
  },
  mutateAndGetPayload: ({id, name}) => {
    var localResourceId = fromGlobalId(id).id;
    renameResource(localResourceId, name);
    return {localResourceId};
  },
});

var GraphQLRenameGroupMutation = mutationWithClientMutationId({
  name: 'RenameGroup',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    group: {
      type: GraphQLGroup,
      resolve: ({localGroupId}) => getGroup(localGroupId),
    }
  },
  mutateAndGetPayload: ({id, name}) => {
    var localGroupId = fromGlobalId(id).id;
    renameGroup(localGroupId, name);
    return {localGroupId};
  },
});

var GraphQLPendingUserToGroupMutation = mutationWithClientMutationId({
  name: 'PendingUserToGroup',
  inputFields: {
    userId: { type: new GraphQLNonNull(GraphQLID) },
    groupId: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    groupEdge: {
      type: GraphQLGroupEdge,
      resolve: ({localUserId, localGroupId}) => {
        var user = getUser(localUserId);
        var group = getGroup(localGroupId);
        return {
          cursor: cursorForObjectInConnection(
            user.groupsPending.map(id => getGroup(id)), 
            group
          ),
          node: group,
        }
      },
    },
    userEdge: {
      type: GraphQLUserEdge,
      resolve: ({localUserId, localGroupId}) => {
        var group = getGroup(localGroupId);
        var user = getUser(localUserId);
        return {
          cursor: cursorForObjectInConnection(
            group.usersPending.map(id => getUser(id)),
            user
          ),
          node: user,
        };
      }
    },
    user: {
      type: GraphQLUser,
      resolve: ({localUserId}) => getUser(localUserId),
    },
    group: {
      type: GraphQLGroup,
      resolve: ({localGroupId}) => getGroup(localGroupId),
    },
  },
  mutateAndGetPayload: ({userId, groupId}) => {
    var localUserId = fromGlobalId(userId).id;
    var localGroupId = fromGlobalId(groupId).id;
    pendingUserToGroup(localUserId, localGroupId);
    return { localUserId, localGroupId };
  },
});

var GraphQLCancelPendingUserToGroupMutation = mutationWithClientMutationId({
  name: 'CancelPendingUserToGroup',
  inputFields: {
    userId: { type: new GraphQLNonNull(GraphQLID) },
    groupId: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    removedUserID: {
      type: GraphQLID,
      resolve: ({localUserId}) => localUserId,
    },
    removedGroupID: {
      type: GraphQLID,
      resolve: ({localGroupId}) => localGroupId,
    },
    user: {
      type: GraphQLUser,
      resolve: ({localUserId}) => getUser(localUserId),
    },
    group: {
      type: GraphQLGroup,
      resolve: ({localGroupId}) => getGroup(localGroupId),
    },
  },
  mutateAndGetPayload: ({userId, groupId}) => {
    var localUserId = fromGlobalId(userId).id;
    var localGroupId = fromGlobalId(groupId).id;
    cancelPendingUserToGroup(localUserId, localGroupId);
    return { localUserId, localGroupId };
  },
});

var GraphQLConnectUserToGroupMutation = mutationWithClientMutationId({
  name: 'ConnectUserToGroup',
  inputFields: {
    userId: { type: new GraphQLNonNull(GraphQLID) },
    groupId: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    groupEdge: {
      type: GraphQLGroupEdge,
      resolve: ({localUserId, localGroupId}) => {
        var user = getUser(localUserId);
        var group = getGroup(localGroupId);
        return {
          cursor: cursorForObjectInConnection(
            user.groups.map(id => getGroup(id)), 
            group
          ),
          node: group,
        }
      },
    },
    userEdge: {
      type: GraphQLUserEdge,
      resolve: ({localGroupId, localUserId}) => {
        var group = getGroup(localGroupId);
        var user = getUser(localUserId);
        return {
          cursor: cursorForObjectInConnection(
            group.users.map(id => getUser(id)),
            user
          ),
          node: user,
        };
      }
    },
    user: {
      type: GraphQLUser,
      resolve: ({localUserId}) => getUser(localUserId),
    },
    group: {
      type: GraphQLGroup,
      resolve: ({localGroupId}) => getGroup(localGroupId),
    },
  },
  mutateAndGetPayload: ({userId, groupId}) => {
    var localUserId = fromGlobalId(userId).id;
    var localGroupId = fromGlobalId(groupId).id;
    connectUserToGroup(localUserId, localGroupId);
    return { localUserId, localGroupId };
  },
});

var GraphQLConnectResourceToGroupMutation = mutationWithClientMutationId({
  name: 'ConnectResourceToGroup',
  inputFields: {
    resourceId: { type: new GraphQLNonNull(GraphQLID) },
    groupId: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    groupEdge: {
      type: GraphQLGroupEdge,
      resolve: ({localResourceId, localGroupId}) => {
        var resource = getResource(localResourceId);
        var group = getGroup(localGroupId);
        return {
          cursor: cursorForObjectInConnection(
            resource.groups.map(id => getGroup(id)), 
            group
          ),
          node: group,
        }
      },
    },
    resourceEdge: {
      type: GraphQLResourceEdge,
      resolve: ({localGroupId, localResourceId}) => {
        var group = getGroup(localGroupId);
        var resource = getResource(localResourceId);
        return {
          cursor: cursorForObjectInConnection(
            group.resources.map(id => getResource(id)),
            resource
          ),
          node: resource,
        };
      }
    },
    resource: {
      type: GraphQLResource,
      resolve: ({localResourceId}) => getResource(localResourceId),
    },
    group: {
      type: GraphQLGroup,
      resolve: ({localGroupId}) => getGroup(localGroupId),
    },
  },
  mutateAndGetPayload: ({resourceId, groupId}) => {
    var localResourceId = fromGlobalId(resourceId).id;
    var localGroupId = fromGlobalId(groupId).id;
    connectResourceToGroup(localResourceId, localGroupId);
    return { localResourceId, localGroupId };
  },
});

var GraphQLDisconnectUserFromGroupMutation = mutationWithClientMutationId({
  name: 'DisconnectUserFromGroup',
  inputFields: {
    userId: { type: new GraphQLNonNull(GraphQLID) },
    groupId: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    removedUserID: {
      type: GraphQLID,
      resolve: ({localUserId}) => localUserId,
    },
    removedGroupID: {
      type: GraphQLID,
      resolve: ({localGroupId}) => localGroupId,
    },
    user: {
      type: GraphQLUser,
      resolve: ({localUserId}) => getUser(localUserId),
    },
    group: {
      type: GraphQLGroup,
      resolve: ({localGroupId}) => getGroup(localGroupId),
    },
  },
  mutateAndGetPayload: ({userId, groupId}) => {
    var localUserId = fromGlobalId(userId).id;
    var localGroupId = fromGlobalId(groupId).id;
    disconnectUserFromGroup(localUserId, localGroupId);
    return { localUserId, localGroupId };
  },
});

var GraphQLDisconnectResourceFromGroupMutation = mutationWithClientMutationId({
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
      type: GraphQLResource,
      resolve: ({localResourceId}) => getResource(localResourceId),
    },
    group: {
      type: GraphQLGroup,
      resolve: ({localGroupId}) => getGroup(localGroupId),
    },
  },
  mutateAndGetPayload: ({resourceId, groupId}) => {
    var localResourceId = fromGlobalId(resourceId).id;
    var localGroupId = fromGlobalId(groupId).id;
    disconnectResourceFromGroup(localResourceId, localGroupId);
    return { localResourceId, localGroupId };
  },
});

var Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    authenticateViewer: GraphQLAuthenticateViewerMutation,
    newUser: GraphQLNewUserMutation,
    newResource: GraphQLNewResourceMutation,
    newGroup: GraphQLNewGroupMutation,
    renameResource: GraphQLRenameResourceMutation,
    renameGroup: GraphQLRenameGroupMutation,
    pendingUserToGroup: GraphQLPendingUserToGroupMutation,
    cancelPendingUserToGroup: GraphQLCancelPendingUserToGroupMutation,
    connectUserToGroup: GraphQLConnectUserToGroupMutation,
    connectResourceToGroup: GraphQLConnectResourceToGroupMutation,
    disconnectUserFromGroup: GraphQLDisconnectUserFromGroupMutation,
    disconnectResourceFromGroup: GraphQLDisconnectResourceFromGroupMutation,
  }),
});

export var Schema = new GraphQLSchema({
  query: Root,
  mutation: Mutation,
});


