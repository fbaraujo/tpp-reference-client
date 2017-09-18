/* global fetch */
import 'whatwg-fetch';

const baseUri = (process.env.API_BASE_URL || 'http://localhost:8003/open-banking/v1.1');

const options = (aspsp) => {
  if (aspsp) {
    return {
      headers: {
        'x-fapi-financial-id': aspsp,
      },
    };
  }
  return { };
};

const asyncAwaitRequest = async (endpoint, aspsp) => {
  let uri;
  let sendData;
  if (aspsp) {
    uri = `${baseUri}${endpoint}`;
    sendData = options(aspsp);
  } else {
    uri = `${baseUri.split('/open-banking')[0]}${endpoint}`;
    sendData = options();
  }
  const response = await fetch(uri, sendData);
  const json = await response.json();
  return json;
};

export default asyncAwaitRequest;
