import {GraphQLObjectType} from 'graphql';
import {globalIdField} from 'graphql-relay';
import {registerType} from './registry';
import {nodeInterface} from './node';
import {getUser} from '../database';
import {UserType} from './UserType';

export default registerType(new GraphQLObjectType({
  name: 'Viewer',
  description: 'The authenticated user or guest.',
  fields: {
    id: globalIdField('Viewer'),
    user: {
      type: UserType,
      resolve: _ => {
        return getUser(_.userId);
      },
    },
  },
  interfaces: [nodeInterface],
}));
