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

import {ResourceConnection} from './GraphQLResource';
import {GroupConnection} from './GraphQLGroup';

var GraphQLUser = new GraphQLObjectType({
  name: 'User',
  description: 'A person who uses our app.',
  fields: () => ({
    id: globalIdField('User'),
    name: {
      type: GraphQLString,
      description: 'A person\'s name.',
    },
    resources: {
      type: ResourceConnection,
      description: 'A person\'s list of economic inputs.',
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(
        _.resources.map(id => getResource(id)),
        args
      ),
    },
    groups: {
      type: GroupConnection,
      description: 'A person\'s list of group memberships.',
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(
        _.groups.map(id => getGroup(id)),
        args
      ),
    },
    groupsPending: {
      type: GroupConnection,
      description: 'A person\'s list of pending group memberships.',
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(
        _.groupsPending.map(id => getGroup(id)),
        args
      ),
    },
  }),
  interfaces: [nodeInterface],
});

var {
  connectionType: UserConnection,
  edgeType: GraphQLUserEdge
} = connectionDefinitions({
  name: 'User',
  nodeType: GraphQLUser,
});

export { GraphQLUser, UserConnection, GraphQLUserEdge};
