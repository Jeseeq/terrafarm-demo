import {
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import {
  cursorForObjectInConnection,
  mutationWithClientMutationId,
} from 'graphql-relay';

import {getEndpoint} from '../types/registry';

import getItem from '../api/getItem';
import createItem from '../api/createItem';

import MasterType from '../types/MasterType';
import {UserType, UserEdge} from '../types/UserType';

export default mutationWithClientMutationId({
  name: 'NewUser',
  inputFields: {
    userName: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    userEdge: {
      type: UserEdge,
      resolve: async ({localUserId}) => {
        const master = await getItem(getEndpoint(MasterType), 1);
        const user = await getItem(getEndpoint(UserType), localUserId);
        return {
          cursor: cursorForObjectInConnection(
            master.users.map(async u => await getItem(getEndpoint(UserType), u.id)),
            user
          ),
          node: user,
        };
      },
    },
    master: {
      type: MasterType,
      resolve: async () => await getItem(getEndpoint(MasterType), 1),
    },
  },
  mutateAndGetPayload: async ({userName}) => {
    return await createItem(getEndpoint(UserType), {
      name: userName,
      resources: [],
      groups: [],
      groups_pending: [],
      viewers: [],
      masters: [{id: 1}],
    }).then((newUser) => {
      return {localUserId: newUser.id};
    });
  },
});

