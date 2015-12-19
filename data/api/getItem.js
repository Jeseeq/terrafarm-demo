import requestify from 'requestify';

const bookId = '5675af1560d5750300eeb91d';
const baseUrl = 'https://api.fieldbook.com/v1/' + bookId;
const options = {
  headers: {accept: 'application/json'},

  auth: {
    username: process.env.FIELDBOOK_USER,
    password: process.env.FIELDBOOK_KEY,
  },
};

export default async function getItem (endpoint, id, info) {
  const url = baseUrl + '/' + endpoint;
  console.log('info -', info);

  let response;
  response = await requestify.get(url, options);
  return JSON.parse(response.body);
/*
  // if get
    response = await requestify.get(url, options);

  // if create
    const record = {
      // Set attributes for new record here
    };
    response = await requestify.post(url, record, options);

  // if update
    options.method = 'PATCH';
    options.body = {
      // Set attributes to update here.
      // Omitted keys are untouched
    };
    response = await requestify.request(url, options);

  // if delete
    response = await requestify.delete(url, options);
    return response.getCode(); // No response body, returns HTTP 204

  return JSON.parse(response.body);
*/
}
