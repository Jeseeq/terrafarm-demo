import requestify from 'requestify';
import {baseUrl, options} from './config';

/* eslint no-unused-vars: 0 */
export default async function updateItem (endpoint, id, body) {
  const url = baseUrl + '/' + endpoint(id);

  options.method = 'PATCH';
  options.body = body;

  let response;
  try {
    response = await requestify.request(url, options);
  } catch (err) {
    console.error('Error updating item:', err);
  }


  return JSON.parse(response.body);
}

