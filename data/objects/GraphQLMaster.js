import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  cursorForObjectInConnection,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay';

import {
  Master,
  Viewer,
  User,
  Resource,
  Group,
  authenticateViewer,
  getMaster,
  getViewer,
  getUser,
  getResource,
  getGroup,
  createUser,
  createResource,
  createGroup,
  renameResource,
  renameGroup,
  pendingUserToGroup,
  cancelPendingUserToGroup,
  connectUserToGroup,
  connectionResourceToGroup,
  disconnectUserFromGroup,
  disconnectionResourceFromGroup,
} from '../database';

var {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    var {type, id} = fromGlobalId(globalId);
    if (type === 'Master') {
      return getMaster();
    } else if (type === 'Viewer') {
      return getViewer();
    } else if (type === 'User') {
      return getUser(id);
    } else if (type === 'Resource') {
      return getResource(id);
    } else if (type === 'Group') {
      return getGroup(id);
    } else {
      return null;
    }
  },
  (obj) => {
    if (obj instanceof Master) {
      return GraphQLMaster;
    } else if (obj instanceof Viewer) {
      return GraphQLViewer;
    } else if (obj instanceof User) {
      return GraphQLUser;
    } else if (obj instanceof Resource) {
      return GraphQLResource;
    } else if (obj instanceof Group) {
      return GraphQLGroup;
    } else {
      return null;
    }
  }
);

import {UserConnection} from './GraphQLUser';
import {ResourceConnection} from './GraphQLResource';
import {GroupConnection} from './GraphQLGroup';

var GraphQLMaster = new GraphQLObjectType({
  name: 'Master',
  description: 'A root-level client wrapper.',
  fields: {
    id: globalIdField('Master'),
    users: {
      type: UserConnection,
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(
        _.users.map(id => getUser(id)),
        args
      ),
    },
    resources: {
      type: ResourceConnection,
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(
        _.resources.map(id => getResource(id)),
        args
      ),
    },
    groups: {
      type: GroupConnection,
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(
        _.groups.map(id => getGroup(id)),
        args
      ),
    },
  },
  interfaces: [nodeInterface],
});

export {GraphQLMaster};
