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
  User,
  Role,
  getUser,
  getViewer,
  getRole,
  getRolesByUser,
  addRoleToViewer,
  removeRoleFromViewer,
} from './database';

/**
 * We get the node interface and field from the Relay library.
 *
 * The first method defines the way we resolve an ID to its object.
 * The second defines the way we resolve an object to its GraphQL type.
 */
var {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    var {type, id} = fromGlobalId(globalId);
    if (type === 'User') {
      return getUser(id);
    } else if (type === 'Role') {
      return getRole(id);
    } else {
      return null;
    }
  },
  (obj) => {
    if (obj instanceof User) {
      return GraphQLUser;
    } else if (obj instanceof Role) {
      return GraphQLRole;
    } else {
      return null;
    }
  }
);

/**
 * Define your own types here
 */
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
      type: RolesConnection,
      description: 'A person\'s collection of roles',
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(getRolesByUser(_.id), args),
    },
  }),
  interfaces: [nodeInterface],
});

var GraphQLRole = new GraphQLObjectType({
  name: 'Role',
  description: 'An economic input',
  fields: () => ({
    id: globalIdField('Role'),
    name: {
      type: GraphQLString,
      description: 'The name of the role',
    },
  }),
  interfaces: [nodeInterface],
});

var {connectionType: RolesConnection} =
  connectionDefinitions({name: 'Role', nodeType: GraphQLRole});

/**
 * This is the type that will be the root of our query,
 * and the entry point into our schema.
 */
var Root = new GraphQLObjectType({
  name: 'Root',
  fields: () => ({
    node: nodeField,
    viewer: {
      type: GraphQLUser,
      resolve: () => getViewer(),
    }
  }),
});

var GraphQLAddRoleToViewerMutation = mutationWithClientMutationId({
  name: 'AddRoleToViewer',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLString) }
  },
  outputFields: {
    role: {
      type: GraphQLRole,
      resolve: (payload) => getRole(payload.roleId)
    },
    viewer: {
      type: GraphQLUser,
      resolve: () => getViewer(),
    },
  },
  mutateAndGetPayload: ({id}) => {
    var localRoleId = fromGlobalId(id).id;
    addRoleToViewer(localRoleId);
    return {localRoleId};
  }
});

var GraphQLRemoveRoleFromViewerMutation = mutationWithClientMutationId({
  name: 'RemoveRoleFromViewer',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLString) }
  },
  outputFields: {
    removedRoleId: {
      type: GraphQLID,
      resolve: ({id}) => id
    },
    viewer: {
      type: GraphQLUser,
      resolve: () => getViewer(),
    },
  },
  mutateAndGetPayload: ({id}) => {
    var localRoleId = fromGlobalId(id).id;
    removeRoleFromViewer(localRoleId);
    return {id};
  }
});

/**
 * This is the type that will be the root of our mutations,
 * and the entry point into performing writes in our schema.
 */
var Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addRoleToViewer: GraphQLAddRoleToViewerMutation,
    removeRoleFromViewer: GraphQLRemoveRoleFromViewerMutation,
  })
});

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
export var Schema = new GraphQLSchema({
  query: Root,
  mutation: Mutation
});
