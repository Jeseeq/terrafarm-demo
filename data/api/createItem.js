import requestify from 'requestify';
import {baseUrl, options} from './config';

/* eslint no-unused-vars:0 */
export default async function createItem (endpoint, id, info) {
  const url = baseUrl + '/' + endpoint;
  const record = {
    // Set attributes for new record here
  };
  const response = await requestify.post(url, record, options);

  return JSON.parse(response.body);
}
