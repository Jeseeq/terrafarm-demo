import requestify from 'requestify';
import {baseUrl, options} from './config';

/* eslint no-unused-vars:0 */
export default async function getItem (endpoint, id, info) {
  const endpointUrl = endpoint(id);
  const url = baseUrl + '/' + endpointUrl;
  const response = await requestify.get(url, options);

  return JSON.parse(response.body);
}

