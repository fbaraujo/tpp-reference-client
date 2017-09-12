/* global fetch */
import 'whatwg-fetch';

const baseUri = (process.env.REACT_APP_API_BASE_URL || 'http://localhost:8003/open-banking/v1.1');

const options = aspsp => ({
  headers: {
    'x-fapi-financial-id': aspsp,
  },
});

const asyncAwaitRequest = async (endpoint, aspsp) => {
  const response = await fetch(`${baseUri}${endpoint}`, options(aspsp));
  const json = await response.json();
  return json;
};

export default asyncAwaitRequest;
