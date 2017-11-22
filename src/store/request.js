/* global fetch */
import 'whatwg-fetch';

export const baseUri = (process.env.API_BASE_URL || 'http://localhost:8003/open-banking/v1.1');
export const accountRequestConsentUri = baseUri.replace('/open-banking/v1.1', '/account-request-authorise-consent');
export const rootUri = `${baseUri.split('/open-banking')[0]}`;

const makeHeaders = (fapiFinancialId) => {
  if (fapiFinancialId) {
    return {
      headers: {
        'x-fapi-financial-id': fapiFinancialId,
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
  const decodeUri = uri => uri; // Get the params etc
  const redirectHandler = (uri) => {
    // Implementation TBD - store Redirect URI etc
    const url = decodeUri(uri);
    window.location = url;
  };
  const { headers } = makeHeaders(aspsp);
  headers['Content-Type'] = 'application/json';
  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });
  // We can't intercept a 302 :-(
  if (response.status === 200) {
    response.json()
      .then(body => redirectHandler(body.uri));
  }
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

const asyncAwaitGetRequest = async (endpoint, fapiFinancialId, unauthorizedType) => {
  let uri;
  let sendData;
  if (fapiFinancialId) {
    uri = `${baseUri}${endpoint}`;
    sendData = makeHeaders(fapiFinancialId);
  } else {
    uri = `${rootUri}${endpoint}`;
    sendData = makeHeaders();
  }
  const response = await fetch(uri, sendData);
  switch (parseInt(response.status, 0)) {
    case 200: {
      const json = await response.json();
      return json;
    }
    case 204:
      return true;
    case 401:
      return unauthorizedType;
    default:
      return null;
  }
};

export const postJson = asyncAwaitPostJson;
export const request = asyncAwaitGetRequest;
export const post = asyncAwaitPost;
