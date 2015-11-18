export class Viewer extends Object {}
export class User extends Object {}
export class Input extends Object {}

// Mock authenticated ID
const VIEWER_ID = 'me';

// Mock data
var jane = Object.assign(
  new User(), {
    id: '1',
    name: 'Jane',
    inputs: {
      provided: ['1'],
      requested: ['2'],
    },
  }
);
var joe = Object.assign(
  new User(), {
    id: '2',
    name: 'Joe',
    inputs: {
      provided: ['3'],
      requested: ['1','2'],
    },
  }
);
var hank = Object.assign(
  new User(), {
    id: '3',
    name: 'Hank',
    inputs: {
      provided: ['2'],
      requested: ['3']
    },
  }
);
var shovel = Object.assign(
  new Input(), {
    id: '1',
    name: 'Shovel',
    users: {
      providers: ['1'],
      requesters: ['2'],
    },
  }
);
var muscle = Object.assign(
  new Input(), {
    id: '2',
    name: 'Muscle',
    users: {
      providers: ['3'],
      requesters: ['1','2'],
    },
  }
);
var land = Object.assign(
  new Input(), {
    id: '3',
    name: 'Land',
    users: {
      providers: ['3'],
      requesters: ['2'],
    },
  }
);

var data = {
  User: {
    1: jane,
    2: joe,
    3: hank,
  },
  Input: {
    1: shovel,
    2: muscle,
    3: land,
  },
};

var viewer = Object.assign(
  new Viewer(), {
    id: VIEWER_ID,
    users: Object.keys(data.User),
    inputs: Object.keys(data.Input),
  }
);

export function getViewer () {
  return viewer;
}

export function getUser (id) {
  return data.User[id];
}

export function getInput (id) {
  return data.Input[id];
}
// stop
var nextUserId = 10;
export function createUser(userName) {
  var newUser = Object.assign(new User(), {
    id: `${nextUserId += 1}`,
    name: userName,
    roles: [],
  });
  viewer.users.push(newUser.id);
  data.User[newUser.id] = newUser;
  return newUser.id;
}

export function addUserRole (userId, roleId) {
  var user = getUser(userId);
  var role = getRole(roleId);
  var roleIndex = user.roles.indexOf(roleId);
  var userIndex = role.users.indexOf(userId);

  if (roleIndex > -1 && userIndex > -1) {
    return console.error(`User ${userId} and role ${roleId} already connected.`);
  }
  user.roles.push(roleId);
  role.users.push(userId);
  return {user, role};
}

export function removeUserRole (userId, roleId) {
  var user = getUser(userId);
  var role = getRole(roleId);
  var roleIndex = user.roles.indexOf(roleId);
  var userIndex = role.users.indexOf(userId);

  if (roleIndex === -1 || userIndex === -1) {
    return console.error(`User ${userId} and role ${roleId} not connected.`);
  }
  user.roles.splice(roleIndex, 1);
  role.users.splice(userIndex, 1);
  return {user, role};
}
