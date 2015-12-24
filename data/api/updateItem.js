import requestify from 'requestify';
import {baseUrl, options} from './config';

/* eslint no-unused-vars:0 */
export default async function updateItem (endpoint, id, body) {
  const url = baseUrl + '/' + endpoint(id);

  options.method = 'PATCH';
  options.body = body;

  const response = await requestify.request(url, options);

  return JSON.parse(response.body);
}

