const { parseState } = require('../../../../src/utils/redirect-back');

const makeState = (authorisationServerId, interactionId, sessionId, scope) => {
  const state = {};
  if (authorisationServerId) {
    Object.assign(state, { authorisationServerId });
  }
  if (interactionId) {
    Object.assign(state, { interactionId });
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
  const interactionId = 'testInteractionId';
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
    const state = makeState(null, interactionId, session, accountsScope);
    checkErrorThrown(() => parseState(state), 'Redirect back state missing authorisationServerId');
  });

  it('when missing interactionId', () => {
    const state = makeState(authServerId, null, session, accountsScope);
    checkErrorThrown(() => parseState(state), 'Redirect back state missing interactionId');
  });

  it('when missing sessionId', () => {
    const state = makeState(authServerId, interactionId, null, accountsScope);
    checkErrorThrown(() => parseState(state), 'Redirect back state missing sessionId');
  });

  it('when missing scope', () => {
    const state = makeState(authServerId, interactionId, session, null);
    checkErrorThrown(() => parseState(state), 'Redirect back state missing scope');
  });

  it('when scope is "openid accounts"', () => {
    const state = makeState(authServerId, interactionId, session, accountsScope);
    const obj = parseState(state);
    expect(obj.scope).to.equal('accounts');
  });

  it('when scope is "openid payments"', () => {
    const state = makeState(authServerId, interactionId, session, paymentsScope);
    const obj = parseState(state);
    expect(obj.scope).to.equal('payments');
  });
});

exports.makeState = makeState;
