/* global fetch */
import 'whatwg-fetch';

export const baseUri = (process.env.API_BASE_URL || 'http://localhost:8003/open-banking/v1.1');
export const rootUri = `${baseUri.split('/open-banking')[0]}`;

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

const asyncAwaitPost = async (endpoint, data) => {
  const response = await fetch(`${rootUri}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    // for now set body string to emulate x-www-form-urlencoded
    body: data,
  });
  const json = await response.json();
  return json;
};

const asyncAwaitRequest = async (endpoint, aspsp) => {
  let uri;
  let sendData;
  if (aspsp) {
    uri = `${baseUri}${endpoint}`;
    sendData = options(aspsp);
  } else {
    uri = `${rootUri}${endpoint}`;
    sendData = options();
  }
  const response = await fetch(uri, sendData);
  const json = await response.json();
  return json;
};

export const request = asyncAwaitRequest;
export const post = asyncAwaitPost;
