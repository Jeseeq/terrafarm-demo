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
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay';

import {
  Viewer,
  Role,
  User,
  getViewer,
  getRole,
  getUser,
  //createUser,
  //addUserRole,
  removeUserRole,
} from './database';

var {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    var {type, id} = fromGlobalId(globalId);
    if (type === 'Viewer') {
      return getViewer();
    } else if (type === 'Role') {
      return getRole(id);
    } else if (type === 'User') {
      return getUser(id);
    } else {
      return null;
    }
  },
  (obj) => {
    if (obj instanceof Viewer) {
      return GraphQLViewer;
    } else if (obj instanceof Role) {
      return GraphQLRole;
    } else if (obj instanceof User) {
      return GraphQLUser;
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
    roles: {
      type: RoleConnection,
      description: 'A person\'s list of labor inputs.',
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(
        _.roles.map(id => getRole(id)),
        args
      ),
    },
  }),
  interfaces: [nodeInterface],
});

var {connectionType: UserConnection} =
  connectionDefinitions({name: 'User', nodeType: GraphQLUser});

var GraphQLRole = new GraphQLObjectType({
  name: 'Role',
  description: 'A labor input.',
  fields: {
    id: globalIdField('Role'),
    name: {
      type: GraphQLString,
      description: 'A labor input\'s name.',
    },
    users: {
      type: UserConnection,
      description: 'A labor input\'s list of users.',
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(
        _.users.map(id => getUser(id)),
        args
      ),
    },
  },
  interfaces: [nodeInterface],
});

var {connectionType: RoleConnection} =
  connectionDefinitions({name: 'Role', nodeType: GraphQLRole});

var GraphQLViewer = new GraphQLObjectType({
  name: 'Viewer',
  description: 'A root-level client wrapper to support connection types.',
  fields: {
    id: globalIdField('Viewer'),
    roles: {
      type: RoleConnection,
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(
        _.roles.map(id => getRole(id)),
        args
      ),
    },
    users: {
      type: UserConnection,
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(
        _.users.map(id => getUser(id)),
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
    },
    roleId: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  outputFields: {
    user: {
      type: GraphQLUser,
      resolve: (payload) => getUser(payload.userId)
    },
    role: {
      type: GraphQLRole,
      resolve: (payload) => getRole(payload.roleId)
    }
  },
  mutateAndGetPayload: ({userName, roleId}) => {
    var newUser = createUser(userName, roleId);
    return {
      userId: newUser.id,
      roleId: roleId,
    };
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
    user: {
      type: GraphQLUser,
      resolve: (payload) => getUser(payload.userId)
    },
    role: {
      type: GraphQLRole,
      resolve: (payload) => getRole(payload.roleId)
    }
  },
  mutateAndGetPayload: ({userId, roleId}) => {
    addUserRole(userId, roleId);
    return {
      userId: userId,
      roleId: roleId,
    };
  }
});
*/
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
     viewer: {
      type: GraphQLUser,
      resolve: () => getViewer(),
    },
    user: {
      type: GraphQLUser,
      resolve: ({userId}) => getUser(userId),
    },
    role: {
      type: GraphQLRole,
      resolve: ({roleId}) => getRole(roleId),
    },
    removedUserID: {
      type: GraphQLID,
      resolve: ({userId}) => userId,
    },
    removedRoleID: {
      type: GraphQLID,
      resolve: ({roleId}) => roleId,
    },
  },
  mutateAndGetPayload: ({userId, roleId}) => {
    var localUserId = fromGlobalId(userId).id;
    var localRoleId = fromGlobalId(roleId).id;
    removeUserRole(localUserId, localRoleId);
    return { userId, roleId };
  }
});

var Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    //newUser: GraphQLNewUserMutation,
    //addUserRole: GraphQLAddUserRoleMutation,
    removeUserRole: GraphQLRemoveUserRoleMutation,
  })
});

export var Schema = new GraphQLSchema({
  query: Root,
  mutation: Mutation
});
