// https://gist.github.com/taion/d161a58b9f7381d8fa9c
import decamelize from 'decamelize';
import { fromGlobalId } from 'graphql-relay';
import pluralize from 'pluralize';

import getItem from '../api/getItem';
/*
import {
  getMaster,
  getViewer,
  getUser,
  getResource,
  getGroup,
} from '../database';
*/
const types = {};
const endpoints = {};
const getItemOverrides = {};

export function getEndpoint (type) {
  return endpoints[type.name];
}

function getDefaultEndpoint (type) {
  const endpoint = pluralize(decamelize(type.name));
  return id => id ? `${endpoint}/${id}` : endpoint;
}

export function registerType (type, endpoint, getItemOverride) {
  types[type.name] = type;
  endpoints[type.name] = endpoint || getDefaultEndpoint(type);
  getItemOverrides[type.name] = getItemOverride;

  // Allow e.g. `export default registerType(MyType);`.
  return type;
}

export async function idFetcher (globalId, info) {
  const { type, id } = fromGlobalId(globalId);

  const getItemOverride = getItemOverrides[type];
  let item;
  if (getItemOverride) {
    item = await getItemOverride(id, info);
  } else {
    item = await getItem(getEndpoint(type), id, info);
/*
    if (type === 'Master') {
      item = getMaster();
    } else if (type === 'Viewer') {
      item = await getViewer();
    } else if (type === 'User') {
      item = await getUser(id);
    } else if (type === 'Resource') {
      item = await getResource(id);
    } else if (type === 'Group') {
      item = await getGroup(id);
    } else {
      console.warn('Warning: type not handled', type);
      item = null;
    }
*/
  }

  return { type, ...item };
}

export function typeResolver (obj) {
  return types[obj.type];
}
