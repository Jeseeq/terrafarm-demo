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
  Viewer,
  User,
  Resource,
  Group,
  getViewer,
  getUser,
  getResource,
  getGroup,
  createUser,
  createResource,
  createGroup,
  connectUserAndResource,
  connectUserAndGroup,
  connectionResourceAndGroup,
  disconnectUserAndResource,
  disconnectUserAndGroup,
  disconnectionResourceAndGroup,
} from './database';

var {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    var {type, id} = fromGlobalId(globalId);
    if (type === 'Viewer') {
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
    if (obj instanceof Viewer) {
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

var GraphQLViewer = new GraphQLObjectType({
  name: 'Viewer',
  description: 'A root-level client wrapper.',
  fields: {
    id: globalIdField('Viewer'),
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

var Root = new GraphQLObjectType({
  name: 'Root',
  fields: {
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
        var viewer = getViewer();
        var user = getUser(localUserId);
        return {
          cursor: cursorForObjectInConnection(
            viewer.users.map(id => getUser(id)),
            user
          ),
          node: user,
        };
      }
    },
    viewer: {
      type: GraphQLViewer,
      resolve: () => getViewer(),
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
    resourceName: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  outputFields: {
    resourceEdge: {
      type: GraphQLResourceEdge,
      resolve: ({localResourceId}) => {
        var viewer = getViewer();
        var resource = getResource(localResourceId);
        return {
          cursor: cursorForObjectInConnection(
            viewer.resources.map(id => getResource(id)),
            resource
          ),
          node: resource,
        };
      }
    },
    viewer: {
      type: GraphQLViewer,
      resolve: () => getViewer(),
    }
  },
  mutateAndGetPayload: ({resourceName}) => {
    var localResourceId = createResource(resourceName);
    return {localResourceId};
  },
});

var GraphQLNewGroupMutation = mutationWithClientMutationId({
  name: 'NewGroup',
  inputFields: {
    groupName: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  outputFields: {
    groupEdge: {
      type: GraphQLGroupEdge,
      resolve: ({localGroupId}) => {
        var viewer = getViewer();
        var group = getGroup(localGroupId);
        return {
          cursor: cursorForObjectInConnection(
            viewer.groups.map(id => getGroup(id)),
            group
          ),
          node: group,
        };
      }
    },
    viewer: {
      type: GraphQLViewer,
      resolve: () => getViewer(),
    }
  },
  mutateAndGetPayload: ({groupName}) => {
    var localGroupId = createGroup(groupName);
    return {localGroupId};
  },
});

var GraphQLConnectUserAndResourceMutation = mutationWithClientMutationId({
  name: 'ConnectUserAndResource',
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
    connectUserAndResource(localUserId, localResourceId);
    return { localUserId, localResourceId };
  },
});

var GraphQLConnectUserAndGroupMutation = mutationWithClientMutationId({
  name: 'ConnectUserAndGroup',
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
    connectUserAndGroup(localUserId, localGroupId);
    return { localUserId, localGroupId };
  },
});

var GraphQLConnectResourceAndGroupMutation = mutationWithClientMutationId({
  name: 'ConnectResourceAndGroup',
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
    connectResourceAndGroup(localResourceId, localGroupId);
    return { localResourceId, localGroupId };
  },
});
/*
var GraphQLDisconnectUserAndResourceMutation = mutationWithClientMutationId({

var GraphQLDisconnectUserAndGroupMutation = mutationWithClientMutationId({

var GraphQLDisconnectResourceAndGroupMutation = mutationWithClientMutationId({

*/
var Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    newUser: GraphQLNewUserMutation,
    newResource: GraphQLNewResourceMutation,
    newGroup: GraphQLNewGroupMutation,
    connectUserAndResource: GraphQLConnectUserAndResourceMutation,
    connectUserAndGroup: GraphQLConnectUserAndGroupMutation,
    connectResourceAndGroup: GraphQLConnectResourceAndGroupMutation,
  }),
});

export var Schema = new GraphQLSchema({
  query: Root,
  mutation: Mutation,
});
