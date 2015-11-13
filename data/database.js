/**
 *  Copyright (c) 2015, Ryan Blakeley
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

// Model types
export class User extends Object {}
export class Role extends Object {}

// Mock data
var users = ['Master', 'Me', 'Bob', 'Jane'].map((name, i) => {
  var user = new User();
  user.name = name;
  user.id = `${i}`;
  return user;
});
var roles = ['Leader', 'Engineer', 'Hands'].map((name, i) => {
  var role = new Role();
  role.name = name;
  role.id = `${i}`;
  return role;
});

// Mock authenticated ID
const MASTER_ID = '0';
const VIEWER_ID = '1';

var roleIdsByUser = {
  [MASTER_ID]: roles.map(r => r.id),
  [VIEWER_ID]: ['0']
};

export function getUser (id) {
  return users.find(u => u.id === id);
}

export function getViewer () {
  return getUser(VIEWER_ID);
}

export function getRole (id) {
  return roles.find(r => r.id === id);
}

export function getViewerRoles () {
  var roles = roleIdsByUser[VIEWER_ID].map(id => getRole(id));
  return roles;
}

export function addRoleToViewer (id) {
  var role = getRole(id);
  roleIdsByUser[VIEWER_ID].push(role.id);
  return role.id;
}

export function removeRoleFromViewer (id) {
  var roleIndex = roleIdsByUser[VIEWER_ID].indexOf(id);
  if (roleIndex !== -1) {
    roleIdsByUser[VIEWER_ID].splice(roleIndex, 1);
  }
}


