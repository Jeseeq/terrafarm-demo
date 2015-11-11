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
class User extends Object {}
class Role extends Object {}
class Space extends Object {}
class Tool extends Object {}
// class Project extends Object {}

// Mock data
var users = ['Anonymous', 'Bob', 'Jane'].map((name, i) => {
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
var spaces = ['Plot', 'Greenhouse', 'Building'].map((name, i) => {
  var space = new Space();
  space.name = name;
  space.id = `${i}`;
  return space;
});
var tools = ['Rake', 'Shovel', 'Barrel'].map((name, i) => {
  var tool = new Tool();
  tool.name = name;
  tool.id = `${i}`;
  return tool;
});

module.exports = {
  // Export methods that your schema can use to interact with your database
  getUser: (id) => users.find(u => u.id === id),
  getViewer: () => users[0],
  getRole: (id) => roles.find(r => r.id === id),
  getRoles: () => roles,
  getSpace: (id) => spaces.find(s => s.id === id),
  getSpaces: () => spaces,
  getTool: (id) => tools.find(t => t.id === id),
  getTools: () => tools,
  User,
  Role,
  Space,
  Tool
};
