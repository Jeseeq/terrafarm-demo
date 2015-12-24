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
// import authenticateViewer from '../api/authenticateViewer';

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
      resolve: ({localUserId}) => getItem(getEndpoint(UserType), localUserId),
    },
    viewer: {
      type: ViewerType,
      resolve: () => getItem(getEndpoint(ViewerType)),
    },
  },
  mutateAndGetPayload: ({userId}) => {
    const localUserId = fromGlobalId(userId).id;
    // authenticateViewer(localUserId);
    return {localUserId};
  },
});

