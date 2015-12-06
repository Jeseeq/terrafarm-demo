import {
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import {
  fromGlobalId,
  mutationWithClientMutationId,
} from 'graphql-relay';

import {
  getUser,
  getViewer,
  authenticateViewer,
} from '../database';

import {UserType} from '../types/UserType';
import ViewerType from '../types/ViewerType';

export default mutationWithClientMutationId({
  name: 'AuthenticateViewer',
  inputFields: {
    userId: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    user: {
      type: UserType,
      resolve: ({localUserId}) => getUser(localUserId),
    },
    viewer: {
      type: ViewerType,
      resolve: () => getViewer(),
    }
  },
  mutateAndGetPayload: ({userId}) => {
    var localUserId = fromGlobalId(userId).id;
    authenticateViewer(localUserId);
    return {localUserId};
  },
});

