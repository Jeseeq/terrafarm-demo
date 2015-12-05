import {connectionDefinitions} from 'graphql-relay';
import UserType from './UserType';

export const {
  connectionType: UserConnection,
  edgeType: UserEdge,
} = connectionDefinitions({
  name: 'User',
  nodeType: UserType,
});

//console.log(UserEdge.isTypeOf);
