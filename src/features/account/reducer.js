import createReducer from '../../store/createReducer';

import { getAccounts } from './api';

import { setAlert } from '../alert/reducer';

const SET_LOADING = 'SET_LOADING';

export const isLoading = createReducer(true, {
  [SET_LOADING](state, action) {
    return action.isLoading;
  }
});

export const setLoading = (isLoading) => ({ type: SET_LOADING, isLoading });

const SET_ACCOUNT = 'SET_ACCOUNT';

export const account = createReducer(null, {
  [SET_ACCOUNT](state, action) {
    return action.account;
  }
});

export const setAccount = (account) => ({ type: SET_ACCOUNT, account });

const SET_ACCOUNTS = 'SET_ACCOUNTS';
const NEW_ACCOUNT = 'NEW_ACCOUNT';
const UPSERT_ACCOUNT = 'UPSERT_ACCOUNT';
const REMOVE_ACCOUNT = 'REMOVE_ACCOUNT';

export const accounts = createReducer([], {
  [SET_ACCOUNTS](state, action) {
    return action.accounts;
  },

  [NEW_ACCOUNT](state, action) {
    return [...state, action.account];
  },

  [UPSERT_ACCOUNT](state, action) {
    let accounts = [...state];
    const index = accounts.findIndex((a) => a._id === action.account._id);
    if (index >= 0) {
      accounts[index] = action.account;
    } else {
      accounts.push(action.account);
    }
    return accounts;
  },

  [REMOVE_ACCOUNT](state, action) {
    return [...state].filter((m) => m._id !== action.accountId);
  }
});

const setAccounts = (accounts) => ({ type: SET_ACCOUNTS, accounts });

export const newAccount = (account) => ({ type: NEW_ACCOUNT, account });

const updateAccount = (account) => ({ type: UPSERT_ACCOUNT, account });

export const upsertAccount = (account) => {
  return async (dispatch, getState) => {
    try {
      dispatch(updateAccount(account));
      if (getState().account._id === account._id) dispatch(setAccount(account));
    } catch (error) {
      dispatch(
        setAlert({
          type: 'Error',
          message: 'Oops! Account update rejected the request'
        })
      );
    }
  };
};

export const removeAccount = (accountId) => ({ type: REMOVE_ACCOUNT, accountId });

export const fetchAccounts = (activeAccountId = null) => {
  return async (dispatch) => {
    try {
      const accounts = await getAccounts();
      dispatch(setAccounts(accounts));
      if (activeAccountId) {
        const currentAccount = accounts.find((a) => a._id === activeAccountId);
        dispatch(setAccount(currentAccount));
      }
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(
        setAlert({
          type: 'Error',
          message: 'Oops! Accounts rejected the request'
        })
      );
    }
  };
};

const SET_USER = 'SET_USER';

export const user = createReducer(null, {
  [SET_USER](state, action) {
    return action.user;
  }
});

export const setUser = (user) => ({ type: SET_USER, user });
