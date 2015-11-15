/**
 *  Copyright (c) 2015, Ryan Blakeley
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

// Mock data
var anonymous = {
  id: '1',
  name: 'Anonymous',
  roles: ['1', '2']
};
var jane = {
  id: '2',
  name: 'Jane',
  roles: ['2']
};
var bob = {
  id: '3',
  name: 'Bob',
  roles: ['3']
};
var supervisor = {
  id: '1',
  name: 'Supervisor',
  users: ['1']
};
var engineer = {
  id: '2',
  name: 'Engineer',
  users: ['1', '2']
};
var farmhand = {
  id: '3',
  name: 'Farmhand',
  users: ['3']
};

var data = {
  Role: {
    1: supervisor,
    2: engineer,
    3: farmhand
  },
  User: {
    1: anonymous,
    2: jane,
    3: bob
  }
};

// Mock authenticated ID
const VIEWER_ID = '1';

var nextUser = 4;
export function createUser(userName, roleId) {
  var newUser = {
    id: '' + (nextUser += 1),
    name: userName
  };
  data.User[newUser.id] = newUser;
  data.Role[roleId].users.push(newUser.id);
  return newUser;
}

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

