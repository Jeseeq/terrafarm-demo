import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLInputObjectType,
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
  name: 'UpdateGroup',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    attributes: {
      type: new GraphQLInputObjectType({
        name: 'groupAttributes',
        fields: {
          name: { type: GraphQLString },
          description: { type: GraphQLString },
          category: { type: GraphQLString },
        },
      }),
    },
  },
  outputFields: {
    group: {
      type: GroupType,
      resolve: async ({localGroupId}) => await getItem(groupEndpoint, localGroupId),
    },
  },
  mutateAndGetPayload: async ({id, attributes}) => {
    const localGroupId = fromGlobalId(id).id;

    return await updateItem(groupEndpoint, localGroupId, attributes)
      .then(result => {
        return {localGroupId: result.id};
      });
  },
});

