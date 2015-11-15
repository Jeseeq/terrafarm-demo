/**
 *  Copyright (c) 2015, Ryan Blakeley
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

export class User extends Object {}
export class Role extends Object {}

// Mock data
var anonymous = Object.assign(new User(), {
  id: '1',
  name: 'Anonymous',
  roles: ['1', '2']
});
var jane = Object.assign(new User(), {
  id: '2',
  name: 'Jane',
  roles: ['2']
});
var bob = Object.assign(new User(), {
  id: '3',
  name: 'Bob',
  roles: ['3']
});
var supervisor = Object.assign(new Role(), {
  id: '1',
  name: 'Supervisor',
  users: ['1']
});
var engineer = Object.assign(new Role(), {
  id: '2',
  name: 'Engineer',
  users: ['1', '2']
});
var farmhand = Object.assign(new Role(), {
  id: '3',
  name: 'Farmhand',
  users: ['3']
});

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

export function getUser (id) {
  return data.User[id];
}

export function getRole (id) {
  return data.Role[id];
}

export function getUsers (names) {
  return names.map(name => {
    if (name === 'anonymous') {
      return anonymous;
    } else if (name === 'jane') {
      return jane;
    } else if (name === 'bob') {
      return bob;
    }
    return null;
  });
}

export function getRoles (names) {
  return names.map(name => {
    if (name === 'supervisor') {
      return supervisor;
    } else if (name === 'engineer') {
      return engineer;
    } else if (name === 'farmhand') {
      return farmhand;
    }
    return null;
  });
}

var nextUser = 4;
export function createUser(userName, roleId) {
  var newUser = {
    id: '' + (nextUser += 1),
    name: userName
  };
  data.User[newUser.id] = newUser;
  // TODO: accept array of role ids
  data.Role[roleId].users.push(newUser.id);
  return newUser;
}

export function addUserRole (userId, roleId) {
  var user = getUser(userId);
  var role = getRole(roleId);
  var roleIndex = user.roles.indexOf(roleId);
  var userIndex = role.users.indexOf(userId);

  if (roleIndex > -1 || userIndex > -1) {
    return console.error(`User ${userId} and role ${roleId} already paired.`);
  }
  user.roles.push(roleId);
  role.users.push(userId);
  return role;
}

export function removeUserRole (userId, roleId) {
  var user = getUser(userId);
  var role = getRole(roleId);
  var roleIndex = user.roles.indexOf(roleId);
  var userIndex = role.users.indexOf(userId);

  if (roleIndex === -1 || userIndex === -1) {
    return console.error(`User ${userId} and role ${roleId} not paired.`);
  }
  user.roles.splice(roleIndex, 1);
  role.users.splice(userIndex, 1);
  return role;
}
