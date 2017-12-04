const { parseState } = require('../../../../src/utils/redirect-back');

const makeState = (authorisationServerId, sessionId, scope) => {
  const state = {};
  if (authorisationServerId) {
    Object.assign(state, { authorisationServerId });
  }
  if (sessionId) {
    Object.assign(state, { sessionId });
  }
  if (scope) {
    Object.assign(state, { scope });
  }
  const encodedState = btoa(JSON.stringify(state));
  return encodedState;
};

describe('parseState', () => {
  const authServerId = 'testAuthServerId';
  const session = 'testSessionId';
  const accountsScope = 'openid accounts';
  const paymentsScope = 'payments openid';

  const checkErrorThrown = (testFn, message) => {
    try {
      testFn();
      expect(true).to.equal(false);
    } catch (err) {
      if (err.code && err.code === 'ERR_ASSERTION') throw err;
      expect(err.message).to.equal(message);
    }
  };

  it('when missing authorisationServerId', () => {
    const state = makeState(null, session, accountsScope);
    checkErrorThrown(() => parseState(state), 'Redirect back state missing authorisationServerId');
  });

  it('when missing sessionId', () => {
    const state = makeState(authServerId, null, accountsScope);
    checkErrorThrown(() => parseState(state), 'Redirect back state missing sessionId');
  });

  it('when missing scope', () => {
    const state = makeState(authServerId, session, null);
    checkErrorThrown(() => parseState(state), 'Redirect back state missing scope');
  });

  it('when scope is "openid accounts"', () => {
    const state = makeState(authServerId, session, accountsScope);
    const obj = parseState(state);
    expect(obj.scope).to.equal('accounts');
  });

  it('when scope is "openid payments"', () => {
    const state = makeState(authServerId, session, paymentsScope);
    const obj = parseState(state);
    expect(obj.scope).to.equal('payments');
  });
});

exports.makeState = makeState;
