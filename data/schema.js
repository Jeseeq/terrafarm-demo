/**
 *  Copyright (c) 2015, Ryan Blakeley
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

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
  // Import methods that your schema can use to interact with your database
  getRole,
  getUser,
  getRoles,
  getUsers,
  createUser,
  //addUserToRole,
  //removeUserFromRole,
} from './database';

var {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    var {type, id} = fromGlobalId(globalId);
    if (type === 'Role') {
      return getRole(id);
    } else if (type === 'User') {
      return getUser(id);
    } else {
      return null;
    }
  },
  (obj) => {
    if (obj instanceof Role) {
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
  description: 'A person who uses our app',
  fields: () => ({
    id: globalIdField('User'),
    name: {
      type: GraphQLString,
      description: 'A person\'s name',
    },
    roles: {
      type: RoleConnection,
      description: 'The roles for the user',
      args: connectionArgs,
      resolve: (user, args) => connectionFromArray(
        user.roles.map((id) => getRole(id)),
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
  description: 'A labor input',
  fields: () => ({
    id: globalIdField('Role'),
    name: {
      type: GraphQLString,
      description: 'The name of the role',
    },
    users: {
      type: UserConnection,
      description: 'The users who fulfill the role',
      args: connectionArgs,
      resolve: (role, args) => connectionFromArray(
        role.users.map((id) => getUser(id)),
        args
      ),
    },
  }),
  interfaces: [nodeInterface],
});

var {connectionType: RoleConnection} =
  connectionDefinitions({name: 'Role', nodeType: GraphQLRole});

var Root = new GraphQLObjectType({
  name: 'Root',
  fields: () => ({
    roles: {
      type: new GraphQLList(GraphQLRole),
      args: {
        names: {
          type: new GraphQLList(GraphQLString),
        },
      },
      resolve: (root, {names}) => getRoles(names),
    },
    users: {
      type: new GraphQLList(GraphQLUser),
      args: {
        names: {
          type: new GraphQLList(GraphQLString),
        },
      },
      resolve: (root, {names}) => getUsers(names),
    },
    node: nodeField,
  }),
});

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
    var newUser = createUser(userName, groupId);
    return {
      userId: newUser.id,
      roleId: roleId,
    };
  }
});

var Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    newUserMutation: GraphQLNewUserMutation,
  })
});

export var Schema = new GraphQLSchema({
  query: Root,
  mutation: Mutation
});
