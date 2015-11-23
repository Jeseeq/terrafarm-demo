export class Master extends Object {}
export class Viewer extends Object {}
export class User extends Object {}
export class Resource extends Object {}
export class Group extends Object {}
export class Shortage extends Object {}

const MASTER_ID = 'earth';
const VIEWER_ID = 'guest';

// Mock data
var jane = Object.assign(
  new User(), {
    id: '1',
    name: 'Jane',
    resources: ['1'],
    groups: ['1'],
  }
);
var joe = Object.assign(
  new User(), {
    id: '2',
    name: 'Joe',
    resources: ['2'],
    groups: ['1'],
  }
);
var hank = Object.assign(
  new User(), {
    id: '3',
    name: 'Hank',
    resources: ['3'],
    groups: ['1'],
  }
);
var shovel = Object.assign(
  new Resource(), {
    id: '1',
    name: 'Shovel',
    users: ['1'],
    groups: ['1'],
  }
);
var muscle = Object.assign(
  new Resource(), {
    id: '2',
    name: 'Muscle',
    users: ['2'],
    groups: ['1'],
  }
);
var land = Object.assign(
  new Resource(), {
    id: '3',
    name: 'Land',
    users: ['3'],
    groups: ['1'],
  }
);
var purple = Object.assign(
  new Group(), {
    id: '1',
    name: 'Purple',
    users: ['1','2','3'],
    resources: ['1','2','3'],
  },
);

var data = {
  User: {
    1: jane,
    2: joe,
    3: hank,
  },
  Resource: {
    1: shovel,
    2: muscle,
    3: land,
  },
  Group: {
    1: purple,
  },
};

var master = Object.assign(
  new Master(), {
    id: MASTER_ID,
    users: Object.keys(data.User),
    resources: Object.keys(data.Resource),
    groups: Object.keys(data.Group),
  }
);

var viewer = Object.assign(
  new Viewer(), {
    id: VIEWER_ID,
    resources: [],
    groups: [],
  }
);

export function authenticateViewer (userId) {
  var user = getUser(userId);
  viewer.id = userId;
  viewer.resources = user.resources;
  viewer.groups = user.groups;
  return userId;
}

export function getMaster () {
  return master;
}

export function getViewer () {
  return viewer;
}

export function getUser (id) {
  return data.User[id];
}

export function getResource (id) {
  return data.Resource[id];
}

export function getGroup (id) {
  return data.Group[id];
}

export function createUser (userName) {
  var newUser = Object.assign(new User(), {
    id: Object.keys(data.User).length + 1,
    name: userName,
    resources: [],
    groups: [],
  });
  master.users.push(newUser.id);
  data.User[newUser.id] = newUser;
  return newUser.id;
}

export function createResource (resourceName) {
  var newResource = Object.assign(new Resource(), {
    id: Object.keys(data.Resource).length + 1,
    name: resourceName,
    users: [],
    groups: [],
  });
  master.resources.push(newResource.id);
  data.Resource[newResource.id] = newResource;
  return newResource.id;
}

export function createGroup (groupName) {
  var newGroup = Object.assign(new Group(), {
    id: Object.keys(data.Group).length + 1,
    name: groupName,
    users: [],
    resources: [],
  });
  master.groups.push(newGroup.id);
  data.Group[newGroup.id] = newGroup;
  return newGroup.id;
}

export function connectResource (resourceId) {
  var userId = viewer.id;
  var user = getUser(userId);
  var resource = getResource(resourceId);
  var userIndex = resource.users.indexOf(userId);
  var resourceIndex = user.resources.indexOf(resourceIndex);

  if (userIndex > -1 || resourceIndex > -1) {
   return console.error('Error: user', user.id, ' and resource', resource.id, 'connected.');
  }

  user.resources.push(resourceId);
  viewer.resources.push(resourceId);
  resource.users.push(userId);

  return {userId, resourceId};
}

export function connectGroup (groupId) {
  var userId = viewer.id;
  var user = getUser(userId);
  var group = getGroup(groupId);
  var userIndex = group.users.indexOf(userId);
  var groupIndex = user.groups.indexOf(groupIndex);

  if (userIndex > -1 || groupIndex > -1) {
    return console.error('Error: user', user.id, ' and group', group.id, 'connected.');
  }

  user.groups.push(groupId);
  viewer.groups.push(groupId);
  group.users.push(userId);

  return {userId, groupId};
}

export function connectResourceToGroup (resourceId, groupId) {
  var resource = getResource(resourceId);
  var group = getGroup(groupId);
  var resourceIndex = group.resources.indexOf(resourceId);
  var groupIndex = resource.groups.indexOf(groupIndex);

  if (resourceIndex > -1 || groupIndex > -1) {
    return console.error('Error: resource', resource.id, ' and group', group.id, 'connected.');
  }

  resource.groups.push(groupId);
  group.resources.push(resourceId);

  return {resourceId, groupId};
}

export function disconnectResource (resourceId) {
  var userId = viewer.id;
  var user = getUser(userId);
  var resource = getResource(resourceId);
  var userIndex = resource.users.indexOf(userId);
  var resourceIndex = user.resources.indexOf(resourceIndex);

  if (userIndex === -1 || resourceIndex === -1) {
    return console.error('Error: user', user.id, ' and resource', resource.id, 'not connected.');
  }

  user.resources.slice(resourceIndex, 1);
  viewer.resources.slice(resourceIndex, 1);
  resource.users.slice(userIndex, 1);

  return {userId, resourceId};
}
export function disconnectGroup (groupId) {
  var userId = viewer.id;
  var user = getUser(userId);
  var group = getGroup(groupId);
  var userIndex = group.users.indexOf(userId);
  var groupIndex = user.groups.indexOf(groupIndex);

  if (userIndex === -1 || groupIndex === -1) {
    return console.error('Error: user', user.id, ' and group', group.id, 'not connected.');
  }

  user.groups.slice(groupIndex, 1);
  viewer.groups.slice(groupIndex, 1);
  group.users.slice(userIndex, 1);

  return {userId, groupId};
}
export function disconnectResourceFromGroup (resourceId, groupId) {
  var resource = getResource(resourceId);
  var group = getGroup(groupId);
  var resourceIndex = group.resources.indexOf(resourceId);
  var groupIndex = resource.groups.indexOf(groupIndex);

  if (resourceIndex === -1 || groupIndex === -1) {
    return console.error('Error: resource', resource.id, ' and group', group.id, 'not connected.');
  }

  resource.groups.slice(groupIndex, 1);
  group.resources.slice(resourceIndex, 1);

  return {resourceId, groupId};
}

