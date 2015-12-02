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
  connectUserToResource,
  connectUserToGroup,
  connectionResourceToGroup,
  disconnectUserFromResource,
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

var GraphQLUser = new GraphQLObjectType({
  name: 'User',
  description: 'A person who uses our app.',
  fields: () => ({
    id: globalIdField('User'),
    name: {
      type: GraphQLString,
      description: 'A person\'s name.',
    },
    resources: {
      type: ResourceConnection,
      description: 'A person\'s list of economic inputs.',
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(
        _.resources.map(id => getResource(id)),
        args
      ),
    },
    groups: {
      type: GroupConnection,
      description: 'A person\'s list of group memberships.',
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(
        _.groups.map(id => getGroup(id)),
        args
      ),
    },
  }),
  interfaces: [nodeInterface],
});

var {
  connectionType: UserConnection,
  edgeType: GraphQLUserEdge
} = connectionDefinitions({
  name: 'User',
  nodeType: GraphQLUser,
});

var GraphQLResource = new GraphQLObjectType({
  name: 'Resource',
  description: 'An economic input.',
  fields: () => ({
    id: globalIdField('Resource'),
    name: {
      type: GraphQLString,
      description: 'An economic resource\'s name.',
    },
    users: {
      type: UserConnection,
      description: 'An economic input\'s list of owners.',
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(
        _.users.map(id => getUser(id)),
        args
      ),
    },
    groups: {
      type: GroupConnection,
      description: 'An economic input\'s list of groups with access.',
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(
        _.groups.map(id => getGroup(id)),
        args
      ),
    },
  }),
  interfaces: [nodeInterface],
});

var {
  connectionType: ResourceConnection,
  edgeType: GraphQLResourceEdge
} = connectionDefinitions({
  name: 'Resource',
  nodeType: GraphQLResource,
});

var GraphQLGroup = new GraphQLObjectType({
  name: 'Group',
  description: 'An organized community.',
  fields: () => ({
    id: globalIdField('Group'),
    name: {
      type: GraphQLString,
      description: 'An organized community\'s name.',
    },
    users: {
      type: UserConnection,
      description: 'An organized community\'s list of members.',
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(
        _.users.map(id => getUser(id)),
        args
      ),
    },
    resources: {
      type: ResourceConnection,
      description: 'An organized community\'s list of economic inputs.',
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(
        _.resources.map(id => getResource(id)),
        args
      ),
    },
  }),
  interfaces: [nodeInterface],
});

var {
  connectionType: GroupConnection,
  edgeType: GraphQLGroupEdge
} = connectionDefinitions({
  name: 'Group',
  nodeType: GraphQLGroup,
});

var GraphQLMaster = new GraphQLObjectType({
  name: 'Master',
  description: 'A root-level client wrapper.',
  fields: {
    id: globalIdField('Master'),
    users: {
      type: UserConnection,
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(
        _.users.map(id => getUser(id)),
        args
      ),
    },
    resources: {
      type: ResourceConnection,
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(
        _.resources.map(id => getResource(id)),
        args
      ),
    },
    groups: {
      type: GroupConnection,
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(
        _.groups.map(id => getGroup(id)),
        args
      ),
    },
  },
  interfaces: [nodeInterface],
});

var GraphQLViewer = new GraphQLObjectType({
  name: 'Viewer',
  description: 'The authenticated user or guest.',
  fields: {
    id: globalIdField('Viewer'),
    user: {
      type: GraphQLUser,
      resolve: _ => {
        return getUser(_.user);
      },
    },
  },
  interfaces: [nodeInterface],
});

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
        userId: {
          type: GraphQLString,
        },
      },
      resolve: (_, {userId}) => {
        var id = fromGlobalId(userId).id;
        return getUser(id);
      },
    },
    resource: {
      type: GraphQLResource,
      args: {
        resourceId: {
          type: GraphQLString,
        },
      },
      resolve: (_, {resourceId}) => {
        var id = fromGlobalId(resourceId).id;
        return getResource(id);
      },
    },
    group: {
      type: GraphQLGroup,
      args: {
        groupId: {
          type: GraphQLString,
        },
      },
      resolve: (_, {groupId}) => {
        var id = fromGlobalId(groupId).id;
        return getGroup(id);
      },
    },
    node: nodeField,
  },
});

var GraphQLAuthenticateViewerMutation = mutationWithClientMutationId({
  name: 'AuthenticateViewer',
  inputFields: {
    userId: {
      type: new GraphQLNonNull(GraphQLString)
    }
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
    userName: {
      type: new GraphQLNonNull(GraphQLString)
    }
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
    userId: {
      type: new GraphQLNonNull(GraphQLID)
    },
    resourceName: {
      type: new GraphQLNonNull(GraphQLString)
    }
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
    userId: {
      type: new GraphQLNonNull(GraphQLID)
    },
    groupName: {
      type: new GraphQLNonNull(GraphQLString)
    }
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

var GraphQLConnectUserToResourceMutation = mutationWithClientMutationId({
  name: 'ConnectUserToResource',
  inputFields: {
    userId: {
      type: new GraphQLNonNull(GraphQLID)
    },
    resourceId: {
      type: new GraphQLNonNull(GraphQLID)
    },
  },
  outputFields: {
    resourceEdge: {
      type: GraphQLResourceEdge,
      resolve: ({localResourceId}) => {
        var user = getUser(localUserId);
        var resource = getResource(localResourceId);
        return {
          cursor: cursorForObjectInConnection(
            user.resources.map(id => getResource(id)), 
            resource
          ),
          node: resource,
        }
      },
    },
    userEdge: {
      type: GraphQLUserEdge,
      resolve: ({localUserId}) => {
        var resource = getResource(localResourceId);
        var user = getUser(localUserId);
        return {
          cursor: cursorForObjectInConnection(
            resource.users.map(id => getUser(id)),
            user
          ),
          node: user,
        };
      }
    },
    viewer: {
      type: GraphQLViewer,
      resolve: getViewer,
    },
    user: {
      type: GraphQLUser,
      resolve: ({localUserId}) => getUser(localUserId),
    },
    resource: {
      type: GraphQLResource,
      resolve: ({localResourceId}) => getResource(localResourceId),
    },
  },
  mutateAndGetPayload: ({userId, resourceId}) => {
    var localUserId = fromGlobalId(userId).id;
    var localResourceId = fromGlobalId(resourceId).id;
    connectUserToResource(localUserId, localResourceId);
    return { localUserId, localResourceId };
  },
});

var GraphQLConnectUserToGroupMutation = mutationWithClientMutationId({
  name: 'ConnectUserToGroup',
  inputFields: {
    userId: {
      type: new GraphQLNonNull(GraphQLID)
    },
    groupId: {
      type: new GraphQLNonNull(GraphQLID)
    },
  },
  outputFields: {
    groupEdge: {
      type: GraphQLGroupEdge,
      resolve: ({localGroupId}) => {
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
      resolve: ({localUserId}) => {
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

var GraphQLConnectUserToResourceToGroupMutation = mutationWithClientMutationId({
  name: 'ConnectUserToResourceToGroup',
  inputFields: {
    resourceId: {
      type: new GraphQLNonNull(GraphQLID)
    },
    groupId: {
      type: new GraphQLNonNull(GraphQLID)
    },
  },
  outputFields: {
    groupEdge: {
      type: GraphQLGroupEdge,
      resolve: ({localGroupId}) => {
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
      resolve: ({localResourceId}) => {
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
    connectUserToResourceToGroup(localResourceId, localGroupId);
    return { localResourceId, localGroupId };
  },
});

var GraphQLDisconnectUserFromResourceMutation = mutationWithClientMutationId({
  name: 'DisconnectUserFromResource',
  inputFields: {
    userId: {
      type: new GraphQLNonNull(GraphQLID)
    },
    resourceId: {
      type: new GraphQLNonNull(GraphQLID)
    },
  },
  outputFields: {
    removedUserID: {
      type: GraphQLID,
      resolve: ({localUserId}) => localUserId,
    },
    removedResourceID: {
      type: GraphQLID,
      resolve: ({localResourceId}) => localResourceId,
    },
    user: {
      type: GraphQLUser,
      resolve: ({localUserId}) => getUser(localUserId),
    },
    resource: {
      type: GraphQLResource,
      resolve: ({localResourceId}) => getResource(localResourceId),
    },
  },
  mutateAndGetPayload: ({userId, resourceId}) => {
    var localUserId = fromGlobalId(userId).id;
    var localResourceId = fromGlobalId(resourceId).id;
    disconnectUserFromResource(localUserId, localResourceId);
    return { localUserId, localResourceId };
  },
});

var GraphQLDisconnectUserFromGroupMutation = mutationWithClientMutationId({
  name: 'DisconnectUserFromGroup',
  inputFields: {
    userId: {
      type: new GraphQLNonNull(GraphQLID)
    },
    groupId: {
      type: new GraphQLNonNull(GraphQLID)
    },
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

var GraphQLDisconnectUserFromResourceFromGroupMutation = mutationWithClientMutationId({
  name: 'DisconnectUserFromResourceFromGroup',
  inputFields: {
    resourceId: {
      type: new GraphQLNonNull(GraphQLID)
    },
    groupId: {
      type: new GraphQLNonNull(GraphQLID)
    },
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
    disconnectUserFromResourceFromGroup(localResourceId, localGroupId);
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
    connectUserToResource: GraphQLConnectUserToResourceMutation,
    connectUserToGroup: GraphQLConnectUserToGroupMutation,
    connectUserToResourceToGroup: GraphQLConnectUserToResourceToGroupMutation,
    disconnectUserFromResource: GraphQLDisconnectUserFromResourceMutation,
    disconnectUserFromGroup: GraphQLDisconnectUserFromGroupMutation,
    disconnectUserFromResourceFromGroup: GraphQLDisconnectUserFromResourceFromGroupMutation,
  }),
});

export var Schema = new GraphQLSchema({
  query: Root,
  mutation: Mutation,
});
