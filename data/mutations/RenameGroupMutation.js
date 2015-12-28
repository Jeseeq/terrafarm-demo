import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
} from 'graphql';

import {
  fromGlobalId,
  mutationWithClientMutationId,
} from 'graphql-relay';

import {getEndpoint} from '../types/registry';

import getItem from '../api/getItem';
import updateItem from '../api/updateItem';

import {GroupType} from '../types/GroupType';

const groupEndpoint = getEndpoint(GroupType);

export default mutationWithClientMutationId({
  name: 'RenameGroup',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    group: {
      type: GroupType,
      resolve: async ({localGroupId}) => await getItem(groupEndpoint, localGroupId),
    },
  },
  mutateAndGetPayload: async ({id, name}) => {
    const localGroupId = fromGlobalId(id).id;

    return await updateItem(groupEndpoint, localGroupId, {
      name,
    }).then(result => {
      return {localGroupId: result.id};
    });
  },
});


