import {
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import {
  fromGlobalId,
  mutationWithClientMutationId,
} from 'graphql-relay';

import {getEndpoint} from '../types/registry';

import getItem from '../api/getItem';
import updateItem from '../api/updateItem';

import {UserType} from '../types/UserType';
import ViewerType from '../types/ViewerType';

const userEndpoint = getEndpoint(UserType);
const viewerEndpoint = getEndpoint(ViewerType);

export default mutationWithClientMutationId({
  name: 'AuthenticateViewer',
  inputFields: {
    userId: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    user: {
      type: UserType,
      resolve: async ({localUserId}) => await getItem(userEndpoint, localUserId),
    },
    viewer: {
      type: ViewerType,
      resolve: async () => await getItem(viewerEndpoint, 1),
    },
  },
  // ...
  mutateAndGetPayload: ({userId}) => {
    const localUserId = fromGlobalId(userId).id;
    // authenticateViewer(localUserId);
    return {localUserId};
  },
});

