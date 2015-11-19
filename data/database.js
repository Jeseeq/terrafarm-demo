export class Viewer extends Object {}
export class User extends Object {}
export class Input extends Object {}
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
  new Input(), {
    id: '1',
    name: 'Shovel',
    provisions: ['1'],
  }
);
var muscle = Object.assign(
  new Input(), {
    id: '2',
    name: 'Muscle',
    provisions: ['2'],
  }
);
var land = Object.assign(
  new Input(), {
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
    input: ['1'],
    group: ['1'],
  }
);
var berlin = Object.assign(
  new Provision, {
    id: '2',
    name: 'Berlin',
    user: ['2'],
    input: ['2'],
    group: ['1'],
  }
);
var moscow = Object.assign(
  new Provision, {
    id: '3',
    name: 'Moscow',
    user: ['3'],
    input: ['3'],
    group: ['1'],
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
    inputs: Object.keys(data.Input),
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

export function getInput (id) {
  return data.Input[id];
}

export function getGroup (id) {
  return data.Group[id];
}

export function getProvision (id) {
  return data.Provision[id];
}

export function createUser(userName) {
  var newUser = Object.assign(new User(), {
    id: Object.keys(data.User).length + 1,
    name: userName,
    provisions: [],
  });
  viewer.users.push(newUser.id);
  data.User[newUser.id] = newUser;
  return newUser.id;
}
/*
export function connectUserToInput (userId, inputId, relationship) {
  var user = getUser(userId);
  var input = getInput(inputId);
  var userIndex = input.users[relationship].indexOf(userId);
  var inputIndex = user.inputs[relationship].indexOf(inputId);

  if (userIndex > -1 && inputIndex > -1) {
    return console.error(`User ${userId} and input ${inputId} already connected.`);
  }
  user.inputs[relationship].push(inputId);
  input.users[relationship].push(userId);
  return {user, input};
}

export function disconnectUserFromInput (userId, inputId, relationship) {
  var user = getUser(userId);
  var input = getInput(inputId);
  var userIndex = input.users[relationship].indexOf(userId);
  var inputIndex = user.inputs[relationship].indexOf(inputId);

  if (userIndex === -1 || inputIndex === -1) {
    return console.error(`User ${userId} and input ${inputId} not connected.`);
  }
  user.inputs[relationship].splice(inputIndex, 1);
  input.users[relationship].splice(userIndex, 1);
  return {user, input};
}
*/
