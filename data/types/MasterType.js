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
  getGroup,
} from '../database';

import {UserConnection} from './UserType';
import {ResourceConnection} from './ResourceType';
import {GroupConnection} from './GroupType';

export default registerType(new GraphQLObjectType({
  name: 'Master',
  description: 'A root-level client wrapper.',
  fields: {
    id: globalIdField('Master'),
    users: {
      type: UserConnection,
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(
        _.users.map(id => getUser(id)),
        args
      ),
    },
    resources: {
      type: ResourceConnection,
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(
        _.resources.map(id => getResource(id)),
        args
      ),
    },
    groups: {
      type: GroupConnection,
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(
        _.groups.map(id => getGroup(id)),
        args
      ),
    },
  },
  interfaces: [nodeInterface],
}));
