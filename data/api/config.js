const bookId = '5675af1560d5750300eeb91d';
export const baseUrl = 'https://api.fieldbook.com/v1/' + bookId;
export const options = {
  headers: {accept: 'application/json'},

  auth: {
    username: process.env.FIELDBOOK_USER,
    password: process.env.FIELDBOOK_KEY,
  },
};
