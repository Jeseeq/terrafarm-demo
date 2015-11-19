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
  Input,
  Group,
  Provision,
  getViewer,
  getUser,
  getInput,
  getGroup,
  getProvision,
} from './database';

var {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    var {type, id} = fromGlobalId(globalId);
    if (type === 'Viewer') {
      return getViewer();
    } else if (type === 'User') {
      return getUser(id);
    } else if (type === 'Input') {
      return getInput(id);
    } else if (type === 'Group') {
      return getGroup(id);
    } else if (type === 'Provision') {
      return getProvision(id);
    } else {
      return null;
    }
  },
  (obj) => {
    if (obj instanceof Viewer) {
      return GraphQLViewer;
    } else if (obj instanceof User) {
      return GraphQLUser;
    } else if (obj instanceof Input) {
      return GraphQLInput;
    } else if (obj instanceof Group) {
      return GraphQLGroup;
    } else if (obj instanceof Provision) {
      return GraphQLProvision;
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
    provisions: {
      type: ProvisionConnection,
      description: 'A person\'s list of commitments.',
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(
        _.provisions.map(id => getProvision(id)),
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

var GraphQLInput = new GraphQLObjectType({
  name: 'Input',
  description: 'An economic resource.',
  fields: () => ({
    id: globalIdField('Input'),
    name: {
      type: GraphQLString,
      description: 'An economic resource\'s name.',
    },
    provisions: {
      type: ProvisionConnection,
      description: 'An economic resource\'s list of commitments.',
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(
        _.provisions.map(id => getProvision(id)),
        args
      ),
    },
  }),
  interfaces: [nodeInterface],
});

var {
  connectionType: InputConnection,
  edgeType: GraphQLInputEdge
} = connectionDefinitions({
  name: 'Input',
  nodeType: GraphQLInput,
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
    provisions: {
      type: ProvisionConnection,
      description: 'An organized community\'s list of commitments.',
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(
        _.provisions.map(id => getProvision(id)),
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

var GraphQLProvision = new GraphQLObjectType({
  name: 'Provision',
  description: 'A commitment describing a person, economic resource, and community.',
  fields: {
    id: globalIdField('Provision'),
    name: {
      type: GraphQLString,
      description: 'A commitment\'s name.',
    },
    user: {
      type: UserConnection,
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(
        _.user.map(id => getUser(id)),
        args
      ),
    },
    input: {
      type: InputConnection,
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(
        _.input.map(id => getInput(id)),
        args
      ),
    },
    group: {
      type: GroupConnection,
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(
        _.group.map(id => getGroup(id)),
        args
      ),
    },
  },
  interfaces: [nodeInterface],
});

var {
  connectionType: ProvisionConnection,
  edgeType: GraphQLProvisionEdge
} = connectionDefinitions({
  name: 'Provision',
  nodeType: GraphQLProvision,
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
    inputs: {
      type: InputConnection,
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(
        _.inputs.map(id => getInput(id)),
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
    provisions: {
      type: ProvisionConnection,
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(
        _.provisions.map(id => getProvision(id)),
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
      resolve: () => getViewer(),
    },
    node: nodeField,
  },
});
/*
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
  }
});

var GraphQLAddUserRoleMutation = mutationWithClientMutationId({
  name: 'AddUserRole',
  inputFields: {
    userId: {
      type: new GraphQLNonNull(GraphQLID)
    },
    roleId: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  outputFields: {
    userEdge: {
      type: GraphQLUserEdge,
      resolve: ({localRoleId, localUserId}) => {
        var role = getRole(localRoleId);
        var user = getUser(localUserId);
        return {
          cursor: cursorForObjectInConnection(
            role.users.map(id => getUser(id)),
            user
          ),
          node: user,
        };
      }
    },
    roleEdge: {
      type: GraphQLRoleEdge,
      resolve: ({localRoleId, localUserId}) => {
        var role = getRole(localRoleId);
        var user = getUser(localUserId);
        return {
          cursor: cursorForObjectInConnection(
            user.roles.map(id => getRole(id)), 
            role
          ),
          node: role,
        };
      }
    },
    user: {
      type: GraphQLUser,
      resolve: ({localUserId}) => getUser(localUserId),
    },
    role: {
      type: GraphQLRole,
      resolve: ({localRoleId}) => getRole(localRoleId),
    },
  },
  mutateAndGetPayload: ({userId, roleId}) => {
    var localUserId = fromGlobalId(userId).id;
    var localRoleId = fromGlobalId(roleId).id;
    addUserRole(localUserId, localRoleId);
    return { localUserId, localRoleId };
  }
});

var GraphQLRemoveUserRoleMutation = mutationWithClientMutationId({
  name: 'RemoveUserRole',
  inputFields: {
    userId: {
      type: new GraphQLNonNull(GraphQLID)
    },
    roleId: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  outputFields: {
    user: {
      type: GraphQLUser,
      resolve: ({localUserId}) => getUser(localUserId),
    },
    role: {
      type: GraphQLRole,
      resolve: ({localRoleId}) => getRole(localRoleId),
    },
    removedUserID: {
      type: GraphQLID,
      resolve: ({localUserId}) => localUserId,
    },
    removedRoleID: {
      type: GraphQLID,
      resolve: ({localRoleId}) => localRoleId,
    },
  },
  mutateAndGetPayload: ({userId, roleId}) => {
    var localUserId = fromGlobalId(userId).id;
    var localRoleId = fromGlobalId(roleId).id;
    removeUserRole(localUserId, localRoleId);
    return { localUserId, localRoleId };
  }
});

var Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    newUser: GraphQLNewUserMutation,
    addUserRole: GraphQLAddUserRoleMutation,
    removeUserRole: GraphQLRemoveUserRoleMutation,
  })
});
*/
export var Schema = new GraphQLSchema({
  query: Root,
  //mutation: Mutation
});
