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

import {ResourceType, ResourceConnection} from './ResourceType';
import {GroupType, GroupConnection} from './GroupType';

export const UserType = registerType(new GraphQLObjectType({
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
        _.resources.map(async resource => await getItem(getEndpoint(ResourceType), resource.id)),
        args
      ),
    },
    groups: {
      type: GroupConnection,
      description: 'A person\'s list of group memberships.',
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(
        _.groups.map(async group => await getItem(getEndpoint(GroupType), group.id)),
        args
      ),
    },
    /* eslint camelcase: 0 */
    groupsPending: {
      type: GroupConnection,
      description: 'A person\'s list of pending group memberships.',
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(
        _.groups_pending.map(async group_pending => await getItem(getEndpoint(GroupType), group_pending.id)),
        args
      ),
    },
  }),
  interfaces: [nodeInterface],
}));

export const {
  connectionType: UserConnection,
  edgeType: UserEdge,
} = connectionDefinitions({
  name: 'User',
  nodeType: UserType,
});
