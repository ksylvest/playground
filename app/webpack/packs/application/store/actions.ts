const LOGIN = 'LOGIN';
const SIGNUP = 'SIGNUP';

export const login = ({ commit }, auth) => { commit(LOGIN, { auth: auth }) }
export const signup = ({ commit }, user) => { commit(SIGNUP, { user: user }) }
