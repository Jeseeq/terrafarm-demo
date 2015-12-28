import requestify from 'requestify';
import {baseUrl, options} from './config';

/* eslint no-unused-vars: 0 */
export default async function createItem (endpoint, record) {
  const url = baseUrl + '/' + endpoint();

  let response;
  try {
    response = await requestify.post(url, record, options);
  } catch (err) {
    return console.error('Error creating item:', err);
  }

  return JSON.parse(response.body);
}
