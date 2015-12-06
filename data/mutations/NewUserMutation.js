import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
} from 'graphql';

import {
  fromGlobalId,
  cursorForObjectInConnection,
  mutationWithClientMutationId,
} from 'graphql-relay';

import {
  getUser,
  getMaster,
  createUser,
} from '../database';

import MasterType from '../types/MasterType';
import {UserEdge} from '../types/UserType';

export default mutationWithClientMutationId({
  name: 'NewUser',
  inputFields: {
    userName: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    userEdge: {
      type: UserEdge,
      resolve: ({localUserId}) => {
        var master = getMaster();
        var user = getUser(localUserId);
        return {
          cursor: cursorForObjectInConnection(
            master.users.map(id => getUser(id)),
            user
          ),
          node: user,
        };
      }
    },
    master: {
      type: MasterType,
      resolve: () => getMaster(),
    },
  },
  mutateAndGetPayload: ({userName}) => {
    var localUserId = createUser(userName);
    return {localUserId};
  },
});

