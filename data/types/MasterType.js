import {
  GraphQLObjectType,
} from 'graphql';

import {
  connectionArgs,
  connectionFromArray,
  globalIdField,
} from 'graphql-relay';

import {registerType, getEndpoint} from './registry';
import {nodeInterface} from './node';

import getItem from '../api/getItem';

import {UserType, UserConnection} from './UserType';
import {ResourceType, ResourceConnection} from './ResourceType';
import {GroupType, GroupConnection} from './GroupType';

// const userEndpoint = getEndpoint(UserType);
// const resourceEndpoint = getEndpoint(ResourceType);
// const groupEndpoint = getEndpoint(GroupType);

export default registerType(new GraphQLObjectType({
  name: 'Master',
  description: 'A root-level client wrapper.',
  fields: {
    id: globalIdField('Master'),
    users: {
      type: UserConnection,
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
    resources: {
      type: ResourceConnection,
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
  },
  interfaces: [nodeInterface],
}));
