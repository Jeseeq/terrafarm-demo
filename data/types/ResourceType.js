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
import {GroupType, GroupConnection} from './GroupType';

// const userEndpoint = getEndpoint(UserType);
// const groupEndpoint = getEndpoint(GroupType);

export const ResourceType = registerType(new GraphQLObjectType({
  name: 'Resource',
  description: 'An economic input.',
  fields: () => ({
    id: globalIdField('Resource'),
    name: {
      type: GraphQLString,
      description: 'An economic resource\'s name.',
    },
    description: {
      type: GraphQLString,
      description: 'An economic resource\'s access availability.',
    },
    category: {
      type: GraphQLString,
      description: 'An economic resource\'s category',
    },
    users: {
      type: UserConnection,
      description: 'An economic input\'s list of owners.',
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
    groups: {
      type: GroupConnection,
      description: 'An economic input\'s list of groups with access.',
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
  }),
  interfaces: [nodeInterface],
}));

export const {
  connectionType: ResourceConnection,
  edgeType: ResourceEdge,
} = connectionDefinitions({
  name: 'Resource',
  nodeType: ResourceType,
});

