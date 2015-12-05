import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionFromArray,
  globalIdField,
} from 'graphql-relay';

import {registerType} from './registry';
import {nodeInterface} from './node';

import {
  getUser,
  getResource,
} from '../database';

import {UserConnection} from './UserConnection';
import {ResourceConnection} from './ResourceConnection';

export default registerType(new GraphQLObjectType({
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
    usersPending: {
      type: UserConnection,
      description: 'An organized community\'s list of pending members.',
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(
        _.usersPending.map(id => getUser(id)),
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
}));
