import {
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import {
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
        const master = getMaster();
        const user = getUser(localUserId);
        return {
          cursor: cursorForObjectInConnection(
            master.users.map(id => getUser(id)),
            user
          ),
          node: user,
        };
      },
    },
    master: {
      type: MasterType,
      resolve: () => getMaster(),
    },
  },
  mutateAndGetPayload: ({userName}) => {
    const localUserId = createUser(userName);
    return {localUserId};
  },
});

