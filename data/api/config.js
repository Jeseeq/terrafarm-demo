const bookId = '568ace7b013b5c0300775eed';
export const baseUrl = 'https://api.fieldbook.com/v1/' + bookId;
export const options = {
  headers: {accept: 'application/json'},

  auth: {
    username: process.env.FIELDBOOK_USER,
    password: process.env.FIELDBOOK_KEY,
  },
};
