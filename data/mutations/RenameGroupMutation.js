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
  getGroup,
  renameGroup,
} from '../database';

import {GroupType} from '../types/GroupType';

export default mutationWithClientMutationId({
  name: 'RenameGroup',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    group: {
      type: GroupType,
      resolve: ({localGroupId}) => getGroup(localGroupId),
    }
  },
  mutateAndGetPayload: ({id, name}) => {
    var localGroupId = fromGlobalId(id).id;
    renameGroup(localGroupId, name);
    return {localGroupId};
  },
});


