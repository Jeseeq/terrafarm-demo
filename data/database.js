export class Viewer extends Object {}
export class User extends Object {}
export class Resource extends Object {}
export class Group extends Object {}
export class Provision extends Object {}

// Mock authenticated ID
const VIEWER_ID = 'me';

// Mock data
var jane = Object.assign(
  new User(), {
    id: '1',
    name: 'Jane',
    provisions: ['1'],
  }
);
var joe = Object.assign(
  new User(), {
    id: '2',
    name: 'Joe',
    provisions: ['2'],
  }
);
var hank = Object.assign(
  new User(), {
    id: '3',
    name: 'Hank',
    provisions: ['3'],
  }
);
var shovel = Object.assign(
  new Resource(), {
    id: '1',
    name: 'Shovel',
    provisions: ['1'],
  }
);
var muscle = Object.assign(
  new Resource(), {
    id: '2',
    name: 'Muscle',
    provisions: ['2'],
  }
);
var land = Object.assign(
  new Resource(), {
    id: '3',
    name: 'Land',
    provisions: ['3'],
  }
);
var purple = Object.assign(
  new Group(), {
    id: '1',
    name: 'Purple',
    provisions: ['1','2','3'],
  },
);
var warsaw = Object.assign(
  new Provision, {
    id: '1',
    name: 'Warsaw',
    user: ['1'],
    resource: ['1'],
    group: ['1'],
  }
);
var berlin = Object.assign(
  new Provision, {
    id: '2',
    name: 'Berlin',
    user: ['2'],
    resource: ['2'],
    group: ['1'],
  }
);
var moscow = Object.assign(
  new Provision, {
    id: '3',
    name: 'Moscow',
    user: ['3'],
    resource: ['3'],
    group: ['1'],
  }
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
  Provision: {
    1: warsaw,
    2: berlin,
    3: moscow,
  },
};

var viewer = Object.assign(
  new Viewer(), {
    id: VIEWER_ID,
    users: Object.keys(data.User),
    resources: Object.keys(data.Resource),
    groups: Object.keys(data.Group),
    provisions: Object.keys(data.Provision),
  }
);

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

export function getProvision (id) {
  return data.Provision[id];
}

export function createUser (userName) {
  var newUser = Object.assign(new User(), {
    id: Object.keys(data.User).length + 1,
    name: userName,
    provisions: [],
  });
  viewer.users.push(newUser.id);
  data.User[newUser.id] = newUser;
  return newUser.id;
}

export function createResource (resourceName) {
  var newResource = Object.assign(new Resource(), {
    id: Object.keys(data.Resource).length + 1,
    name: resourceName,
    provisions: [],
  });
  viewer.resources.push(newResource.id);
  data.Resource[newResource.id] = newResource;
  return newResource.id;
}

export function createGroup (groupName) {
  var newGroup = Object.assign(new Group(), {
    id: Object.keys(data.Group).length + 1,
    name: groupName,
    provisions: [],
  });
  viewer.groups.push(newGroup.id);
  data.Group[newGroup.id] = newGroup;
  return newGroup.id;
}
/*
export function connectUserToResource (userId, resourceId, relationship) {
  var user = getUser(userId);
  var resource = getResource(resourceId);
  var userIndex = resource.users[relationship].indexOf(userId);
  var resourceIndex = user.resources[relationship].indexOf(resourceId);

  if (userIndex > -1 && resourceIndex > -1) {
    return console.error(`User ${userId} and resource ${resourceId} already connected.`);
  }
  user.resources[relationship].push(resourceId);
  resource.users[relationship].push(userId);
  return {user, resource};
}

export function disconnectUserFromResource (userId, resourceId, relationship) {
  var user = getUser(userId);
  var resource = getResource(resourceId);
  var userIndex = resource.users[relationship].indexOf(userId);
  var resourceIndex = user.resources[relationship].indexOf(resourceId);

  if (userIndex === -1 || resourceIndex === -1) {
    return console.error(`User ${userId} and resource ${resourceId} not connected.`);
  }
  user.resources[relationship].splice(resourceIndex, 1);
  resource.users[relationship].splice(userIndex, 1);
  return {user, resource};
}
*/
