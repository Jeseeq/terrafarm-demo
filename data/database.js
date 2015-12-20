class Master extends Object {}
class Viewer extends Object {}
class User extends Object {}
class Resource extends Object {}
class Group extends Object {}

const MASTER_ID = 'earth';
const VIEWER_ID = 'me';

// Mock data
const guest = Object.assign(
  new User(), {
    id: '1',
    name: 'Guest',
    resources: [],
    groups: [],
    groupsPending: [],
  }
);
const joe = Object.assign(
  new User(), {
    id: '2',
    name: 'Joe',
    resources: ['2'],
    groups: ['1'],
    groupsPending: [],
  }
);
const hank = Object.assign(
  new User(), {
    id: '3',
    name: 'Hank',
    resources: ['3'],
    groups: ['1'],
    groupsPending: [],
  }
);
const jane = Object.assign(
  new User(), {
    id: '4',
    name: 'Jane',
    resources: ['1'],
    groups: ['1'],
    groupsPending: [],
  }
);
const shovel = Object.assign(
  new Resource(), {
    id: '1',
    name: 'Shovel',
    users: ['1'],
    groups: ['1'],
    // groupsPending: [],
  }
);
const muscle = Object.assign(
  new Resource(), {
    id: '2',
    name: 'Muscle',
    users: ['2'],
    groups: ['1'],
    // groupsPending: [],
  }
);
const land = Object.assign(
  new Resource(), {
    id: '3',
    name: 'Land',
    users: ['3'],
    groups: ['1'],
    // groupsPending: [],
  }
);
const purple = Object.assign(
  new Group(), {
    id: '1',
    name: 'Purple',
    users: ['1', '2', '3'],
    usersPending: [],
    resources: ['1', '2', '3'],
    // resourcesPending: [],
  },
);

const data = {
  User: {
    1: guest,
    2: joe,
    3: hank,
    4: jane,
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

const master = Object.assign(
  new Master(), {
    id: MASTER_ID,
    users: Object.keys(data.User),
    resources: Object.keys(data.Resource),
    groups: Object.keys(data.Group),
  }
);

const viewer = Object.assign(
  new Viewer(), {
    id: VIEWER_ID,
    userId: '1',
  }
);

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

export function authenticateViewer (userId) {
  viewer.userId = userId;
  return userId;
}

export function createUser (userName) {
  const newUser = Object.assign(new User(), {
    id: String(Object.keys(data.User).length + 1),
    name: userName,
    resources: [],
    groups: [],
    groupsPending: [],
  });
  master.users.push(newUser.id);
  data.User[newUser.id] = newUser;
  return newUser.id;
}

export function createResource (userId, resourceName) {
  const newResource = Object.assign(new Resource(), {
    id: String(Object.keys(data.Resource).length + 1),
    name: resourceName,
    users: [userId],
    groups: [],
  });
  const user = getUser(userId);
  user.resources.push(newResource.id);
  master.resources.push(newResource.id);
  data.Resource[newResource.id] = newResource;
  return newResource.id;
}

export function createGroup (userId, groupName) {
  const newGroup = Object.assign(new Group(), {
    id: String(Object.keys(data.Group).length + 1),
    name: groupName,
    users: [userId],
    usersPending: [],
    resources: [],
  });
  const user = getUser(userId);
  user.groups.push(newGroup.id);
  master.groups.push(newGroup.id);
  data.Group[newGroup.id] = newGroup;
  return newGroup.id;
}

export function renameResource (id, name) {
  const resource = getResource(id);
  resource.name = name;
}

export function renameGroup (id, name) {
  const group = getGroup(id);
  group.name = name;
}

export function pendingUserToGroup (userId, groupId) {
  const user = getUser(userId);
  const group = getGroup(groupId);
  const userIndex = group.users.indexOf(userId);
  const groupIndex = user.groups.indexOf(groupId);
  const userPendingIndex = group.usersPending.indexOf(userId);
  const groupPendingIndex = user.groupsPending.indexOf(groupId);

  if (userIndex > -1
      || groupIndex > -1
      || userPendingIndex > -1
      || groupPendingIndex > -1) {
    console.error('Error: user', user.id, ' and group', group.id, 'already pending or connected.');
    return;
  }

  user.groupsPending.push(groupId);
  group.usersPending.push(userId);
}

export function cancelPendingUserToGroup (userId, groupId) {
  const user = getUser(userId);
  const group = getGroup(groupId);
  const userIndex = group.usersPending.indexOf(userId);
  const groupIndex = user.groupsPending.indexOf(groupId);

  if (userIndex === -1 || groupIndex === -1) {
    return console.error('Error: user', user.id, ' and group', group.id, 'already not pending.');
  }

  user.groupsPending.splice(groupIndex, 1);
  group.usersPending.splice(userIndex, 1);
}

export function connectUserToGroup (userId, groupId) {
  const user = getUser(userId);
  const group = getGroup(groupId);
  const userIndex = group.users.indexOf(userId);
  const groupIndex = user.groups.indexOf(groupId);

  if (userIndex > -1 || groupIndex > -1) {
    return console.error('Error: user', user.id, ' and group', group.id, 'already connected.');
  }

  user.groups.push(groupId);
  group.users.push(userId);
}

export function connectResourceToGroup (resourceId, groupId) {
  const resource = getResource(resourceId);
  const group = getGroup(groupId);
  const resourceIndex = group.resources.indexOf(resourceId);
  const groupIndex = resource.groups.indexOf(groupId);

  if (resourceIndex > -1 || groupIndex > -1) {
    return console.error('Error: resource', resource.id, ' and group', group.id, 'already connected.');
  }

  resource.groups.push(groupId);
  group.resources.push(resourceId);
}

export function disconnectUserFromGroup (userId, groupId) {
  const user = getUser(userId);
  const group = getGroup(groupId);
  const userIndex = group.users.indexOf(userId);
  const groupIndex = user.groups.indexOf(groupId);

  if (userIndex === -1 || groupIndex === -1) {
    return console.error('Error: user', user.id, ' and group', group.id, 'already not connected.');
  }

  user.groups.splice(groupIndex, 1);
  group.users.splice(userIndex, 1);
}

export function disconnectResourceFromGroup (resourceId, groupId) {
  const resource = getResource(resourceId);
  const group = getGroup(groupId);
  const resourceIndex = group.resources.indexOf(resourceId);
  const groupIndex = resource.groups.indexOf(groupId);

  if (resourceIndex === -1 || groupIndex === -1) {
    return console.error('Error: resource', resource.id, ' and group', group.id, 'already not connected.');
  }

  resource.groups.splice(groupIndex, 1);
  group.resources.splice(resourceIndex, 1);

  return {resourceId, groupId};
}

