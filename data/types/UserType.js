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
  getResource,
  getGroup,
} from '../database';

import {ResourceConnection} from './ResourceConnection';
import {GroupConnection} from './GroupConnection';

export default registerType(new GraphQLObjectType({
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
    groupsPending: {
      type: GroupConnection,
      description: 'A person\'s list of pending group memberships.',
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(
        _.groupsPending.map(id => getGroup(id)),
        args
      ),
    },
  }),
  interfaces: [nodeInterface],
}));
