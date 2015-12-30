import {GraphQLObjectType} from 'graphql';
import {globalIdField} from 'graphql-relay';
import {registerType, getEndpoint} from './registry';
import {nodeInterface} from './node';
import getItem from '../api/getItem';
import {UserType} from './UserType';

// const userEndpoint = getEndpoint(UserType);

export default registerType(new GraphQLObjectType({
  name: 'Viewer',
  description: 'The authenticated user or guest.',
  fields: {
    id: globalIdField('Viewer'),
    user: {
      type: UserType,
      resolve: async _ => {
        const result = await getItem(getEndpoint(UserType), _.users[0].id);
        return result;
      },
    },
  },
  interfaces: [nodeInterface],
}));
