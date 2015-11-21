export class Viewer extends Object {}
export class User extends Object {}
export class Resource extends Object {}
export class Group extends Object {}
export class Shortage extends Object {}

// Mock authenticated ID
const VIEWER_ID = 'me';

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

var viewer = Object.assign(
  new Viewer(), {
    id: VIEWER_ID,
    users: Object.keys(data.User),
    resources: Object.keys(data.Resource),
    groups: Object.keys(data.Group),
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

export function createUser (userName) {
  var newUser = Object.assign(new User(), {
    id: Object.keys(data.User).length + 1,
    name: userName,
    resources: [],
    groups: [],
  });
  viewer.users.push(newUser.id);
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
  viewer.resources.push(newResource.id);
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
  viewer.groups.push(newGroup.id);
  data.Group[newGroup.id] = newGroup;
  return newGroup.id;
}

