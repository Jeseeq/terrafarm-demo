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
  name: 'Anonymous'
};
var jane = {
  id: '2',
  name: 'Jane'
};
var bob = {
  id: '3',
  name: 'Bob'
};
var supervisors = {
  id: '1',
  name: 'Supervisors',
  users: ['1']
};
var engineers = {
  id: '2',
  name: 'Engineers',
  users: ['1', '2']
};
var farmhands = {
  id: '3',
  name: 'Farmhands',
  users: ['3']
};

var data = {
  Role: {
    1: supervisors,
    2: engineers,
    3: farmhands
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

export function getRoles (names) {
  return names.map(name => {
    if (name === 'supervisors') {
      return supervisors;
    } else if (name === 'engineers') {
      return engineers;
    } else if (name === 'farmhands') {
      return farmhands;
    }
    return null;
  });
}

