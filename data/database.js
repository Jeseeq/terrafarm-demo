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
      provide: ['1'],
      request: ['2'],
    },
  }
);
var joe = Object.assign(
  new User(), {
    id: '2',
    name: 'Joe',
    inputs: {
      provide: ['3'],
      request: ['1','2'],
    },
  }
);
var hank = Object.assign(
  new User(), {
    id: '3',
    name: 'Hank',
    inputs: {
      provide: ['2'],
      request: ['3']
    },
  }
);
var shovel = Object.assign(
  new Input(), {
    id: '1',
    name: 'Shovel',
    users: {
      provide: ['1'],
      request: ['2'],
    },
  }
);
var muscle = Object.assign(
  new Input(), {
    id: '2',
    name: 'Muscle',
    users: {
      provide: ['3'],
      request: ['1','2'],
    },
  }
);
var land = Object.assign(
  new Input(), {
    id: '3',
    name: 'Land',
    users: {
      provide: ['3'],
      request: ['2'],
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

var nextUserId = 3;
export function createUser(userName) {
  var newUser = Object.assign(new User(), {
    id: `${nextUserId += 1}`,
    name: userName,
    inputs: {
      provide: [],
      request: [],
    },
  });
  viewer.users.push(newUser.id);
  data.User[newUser.id] = newUser;
  return newUser.id;
}

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
