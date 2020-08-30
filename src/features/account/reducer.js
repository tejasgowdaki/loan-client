import createReducer from '../../store/createReducer';

const SET_ACCOUNT = 'SET_ACCOUNT';

export const account = createReducer(null, {
  [SET_ACCOUNT](state, action) {
    return action.account;
  }
});

export const setAccount = (account) => ({ type: SET_ACCOUNT, account });
