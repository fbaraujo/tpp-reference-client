/* global fetch */
import 'whatwg-fetch';

export const baseUri = (process.env.API_BASE_URL || 'http://localhost:8003/open-banking/v1.1');
export const accountRequestConsentUri = (process.env.ACCOUNT_REQUEST_CONSENT_URI || 'http://localhost:8003/account-request-authorise-consent');
export const rootUri = `${baseUri.split('/open-banking')[0]}`;

const makeHeaders = (aspsp) => {
  if (aspsp) {
    return {
      headers: {
        'x-fapi-financial-id': aspsp,
        Accept: 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    };
  } else if (localStorage.getItem('token')) {
    return {
      headers: {
        Accept: 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    };
  }
  return {
    headers: {
      Accept: 'application/json',
    },
  };
};

const asyncAwaitPostJson = async (endpoint, aspsp, data, unauthorizedType) => {
  const { headers } = makeHeaders(aspsp);
  headers['Content-Type'] = 'application/json';
  const response = await fetch(accountRequestConsentUri, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });
  if (response.status === 204) {
    return null;
  } else if (response.status === 401) {
    return unauthorizedType;
  }
  return null;
};

const asyncAwaitPost = async (endpoint, data, unauthorizedType) => {
  const response = await fetch(`${rootUri}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    // for now set body string to emulate x-www-form-urlencoded
    body: data,
  });
  if (response.status === 200) {
    const json = await response.json();
    return json;
  } else if (response.status === 401) {
    return unauthorizedType;
  }
  return null;
};

const asyncAwaitGetRequest = async (endpoint, aspsp, unauthorizedType) => {
  let uri;
  let sendData;
  if (aspsp) {
    uri = `${baseUri}${endpoint}`;
    sendData = makeHeaders(aspsp);
  } else {
    uri = `${rootUri}${endpoint}`;
    sendData = makeHeaders();
  }
  const response = await fetch(uri, sendData);
  if (response.status === 200) {
    const json = await response.json();
    return json;
  } else if (response.status === 401) {
    return unauthorizedType;
  }
  return null;
};

export const postJson = asyncAwaitPostJson;
export const request = asyncAwaitGetRequest;
export const post = asyncAwaitPost;
