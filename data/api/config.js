const bookId = process.env.FIELDBOOK_ID;
export const baseUrl = 'https://api.fieldbook.com/v1/' + bookId;
export const options = {
  headers: {accept: 'application/json'},

  auth: {
    username: process.env.FIELDBOOK_USER,
    password: process.env.FIELDBOOK_KEY,
  },
};
