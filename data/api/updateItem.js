import requestify from 'requestify';
import {baseUrl, options} from './config';

/* eslint no-unused-vars:0 */
export default async function updateItem (endpoint, id, info) {
  const url = baseUrl + '/' + endpoint;

  options.method = 'PATCH';
  options.body = {
    // Set attributes to update here.
    // Omitted keys are untouched
  };

  const response = await requestify.request(url, options);

  return JSON.parse(response.body);
}

