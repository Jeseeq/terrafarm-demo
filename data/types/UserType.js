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

// const resourceEndpoint = getEndpoint(ResourceType);
// const groupEndpoint = getEndpoint(GroupType);

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
      resolve: async (_, args) => {
        const resourcePromises = _.resources.map(r => getItem(getEndpoint(ResourceType), r.id));
        const resourceResults = await* resourcePromises;
        return connectionFromArray(
          resourceResults,
          args
        );
      },
    },
    groups: {
      type: GroupConnection,
      description: 'A person\'s list of group memberships.',
      args: connectionArgs,
      resolve: async (_, args) => {
        const groupPromises = _.groups.map(g => getItem(getEndpoint(GroupType), g.id));
        const groupResults = await* groupPromises;
        return connectionFromArray(
          groupResults,
          args
        );
      },
    },
    /* eslint camelcase: 0 */
    groupsPending: {
      type: GroupConnection,
      description: 'A person\'s list of pending group memberships.',
      args: connectionArgs,
      resolve: async (_, args) => {
        const groupPromises = _.groups_pending.map(g => getItem(getEndpoint(GroupType), g.id));
        const groupResults = await* groupPromises;
        return connectionFromArray(
          groupResults,
          args
        );
      },
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
