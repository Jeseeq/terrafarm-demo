import requestify from 'requestify';
import {baseUrl, options} from './config';

/* eslint no-unused-vars:0 */
export default async function deleteItem (endpoint, id, info) {
  const url = baseUrl + '/' + endpoint(id);
  const response = await requestify.delete(url, options);

  return response.getCode(); // No response body, returns HTTP 204
}

