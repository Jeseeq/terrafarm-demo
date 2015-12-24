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

import {getEndpoint} from '../types/registry';
/*
import {
  getUser,
  getGroup,
  getMaster,
  createGroup,
} from '../database';
*/
import {UserType} from '../types/UserType';
import {GroupType, GroupEdge} from '../types/GroupType';
import MasterType from '../types/MasterType';

export default mutationWithClientMutationId({
  name: 'NewGroup',
  inputFields: {
    userId: { type: new GraphQLNonNull(GraphQLID) },
    groupName: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    groupEdge: {
      type: GroupEdge,
      resolve: ({localGroupId}) => {
        const master = getItem(getEndpoint(MasterType));
        const group = getItem(getEndpoint(GroupType), localGroupId);
        // ...
        return {
          cursor: cursorForObjectInConnection(
            master.groups.map(id => getGroup(id)),
            group
          ),
          node: group,
        };
      },
    },
    user: {
      type: UserType,
      resolve: ({localUserId}) => getUser(localUserId),
    },
    master: {
      type: MasterType,
      resolve: () => getMaster(),
    },
  },
  mutateAndGetPayload: ({userId, groupName}) => {
    const localUserId = fromGlobalId(userId).id;
    const localGroupId = createGroup(localUserId, groupName);
    return {localUserId, localGroupId};
  },
});

