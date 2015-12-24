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

import {registerType, getEndpoint} from './registry';
import {nodeInterface} from './node';

import getItem from '../api/getItem';

import {UserType, UserConnection} from './UserType';
import {ResourceType, ResourceConnection} from './ResourceType';

export const GroupType = registerType(new GraphQLObjectType({
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
        _.users.map(async user => await getItem(getEndpoint(UserType), user.id)),
        args
      ),
    },
    /* eslint camelcase: 0 */
    usersPending: {
      type: UserConnection,
      description: 'An organized community\'s list of pending members.',
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(
        _.users_pending.map(async user_pending => await getItem(getEndpoint(UserType), user_pending.id)),
        args
      ),
    },
    resources: {
      type: ResourceConnection,
      description: 'An organized community\'s list of economic inputs.',
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(
        _.resources.map(async resource => await getItem(getEndpoint(ResourceType), resource.id)),
        args
      ),
    },
  }),
  interfaces: [nodeInterface],
}));

export const {
  connectionType: GroupConnection,
  edgeType: GroupEdge,
} = connectionDefinitions({
  name: 'Group',
  nodeType: GroupType,
});
