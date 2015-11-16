export class Viewer extends Object {}
export class User extends Object {}
export class Role extends Object {}

// Mock authenticated ID
const VIEWER_ID = 'me';

// Mock data
var anonymous = Object.assign(
  new User(), {
    id: '1',
    name: 'Anonymous',
    roles: ['1', '2']
  }
);
var jane = Object.assign(
  new User(), {
    id: '2',
    name: 'Jane',
    roles: ['2']
  }
);
var bob = Object.assign(
  new User(), {
    id: '3',
    name: 'Bob',
    roles: ['3']
  }
);
var supervisor = Object.assign(
  new Role(), {
    id: '1',
    name: 'Supervisor',
    users: ['1']
  }
);
var engineer = Object.assign(
  new Role(), {
    id: '2',
    name: 'Engineer',
    users: ['1', '2']
  }
);
var farmhand = Object.assign(
  new Role(), {
    id: '3',
    name: 'Farmhand',
    users: ['3']
  }
);

var data = {
  User: {
    1: anonymous,
    2: jane,
    3: bob
  },
  Role: {
    1: supervisor,
    2: engineer,
    3: farmhand
  },
};

var viewer = Object.assign(
  new Viewer(), {
    id: VIEWER_ID,
    users: Object.keys(data.User),
    roles: Object.keys(data.Role),
  }
);

export function getViewer () {
  return viewer;
}

export function getUser (id) {
  return data.User[id];
}

export function getRole (id) {
  return data.Role[id];
}
/*
var nextUser = 4;
export function createUser(userName) {
  var newUser = {
    id: '' + (nextUser += 1),
    name: userName,
    roles: [],
  };
  data.User[newUser.id] = newUser;
  return newUser;
}
*/
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
