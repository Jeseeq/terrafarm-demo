import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionFromArray,
  connectionDefinitions,
  globalIdField,
} from 'graphql-relay';

import {registerType} from './registry';
import {nodeInterface} from './node';

import {
  getUser,
  getGroup,
} from '../database';

import {UserConnection} from './UserType';
import {GroupConnection} from './GroupType';

export const ResourceType = registerType(new GraphQLObjectType({
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
}));

export const {
  connectionType: ResourceConnection,
  edgeType: ResourceEdge
} = connectionDefinitions({
  name: 'Resource',
  nodeType: ResourceType,
});

