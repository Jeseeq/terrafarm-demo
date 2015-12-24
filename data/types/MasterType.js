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

export default registerType(new GraphQLObjectType({
  name: 'Master',
  description: 'A root-level client wrapper.',
  fields: {
    id: globalIdField('Master'),
    users: {
      type: UserConnection,
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(
        _.users.map(async user => await getItem(getEndpoint(UserType), user.id)),
        args
      ),
    },
    resources: {
      type: ResourceConnection,
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(
        _.resources.map(async resource => await getItem(getEndpoint(ResourceType), resource.id)),
        args
      ),
    },
    groups: {
      type: GroupConnection,
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(
        _.groups.map(async group => await getItem(getEndpoint(GroupType), group.id)),
        args
      ),
    },
  },
  interfaces: [nodeInterface],
}));
