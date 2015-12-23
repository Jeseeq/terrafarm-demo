import requestify from 'requestify';
import {baseUrl, options} from './config';

/* eslint no-unused-vars:0 */
export default async function getItem (endpoint, id, info) {
  const url = baseUrl + '/' + endpoint(id);
  const response = await requestify.get(url, options);
  // console.log(response.body);

  return JSON.parse(response.body);
}

