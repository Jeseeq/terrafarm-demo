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

// const userEndpoint = getEndpoint(UserType);
// const resourceEndpoint = getEndpoint(ResourceType);

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
      resolve: async (_, args) => {
        const userPromises = _.users.map(u => getItem(getEndpoint(UserType), u.id));
        const userResults = await* userPromises;
        return connectionFromArray(
          userResults,
          args
        );
      },
    },
    /* eslint camelcase: 0 */
    usersPending: {
      type: UserConnection,
      description: 'An organized community\'s list of pending members.',
      args: connectionArgs,
      resolve: async (_, args) => {
        const userPromises = _.users_pending.map(u => getItem(getEndpoint(UserType), u.id));
        const userResults = await* userPromises;
        return connectionFromArray(
          userResults,
          args
        );
      },
    },
    resources: {
      type: ResourceConnection,
      description: 'An organized community\'s list of economic inputs.',
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
