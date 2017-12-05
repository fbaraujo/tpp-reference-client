
const parseState = (queryState) => {
  let state;
  try {
    state = JSON.parse(atob(queryState));
  } catch (e) {
    throw new Error('Invalid state format');
  }
  if (!state.authorisationServerId) {
    throw new Error('Redirect back state missing authorisationServerId');
  }
  if (!state.interactionId) {
    throw new Error('Redirect back state missing interactionId');
  }
  if (!state.sessionId) {
    throw new Error('Redirect back state missing sessionId');
  }
  if (!state.scope) {
    throw new Error('Redirect back state missing scope');
  }
  if (state.scope.includes('accounts')) {
    Object.assign(state, { scope: 'accounts' });
  }
  if (state.scope.includes('payments')) {
    Object.assign(state, { scope: 'payments' });
  }
  return state;
};

export { parseState }; // eslint-disable-line
