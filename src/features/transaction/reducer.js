import createReducer from '../../store/createReducer';

import { getTransactions } from './api';

import { setAlert } from '../alert/reducer';

const SET_TRANSACTIONS = 'SET_TRANSACTIONS';
const NEW_TRANSACTION = 'NEW_TRANSACTION';
const REMOVE_TRANSACTION = 'REMOVE_TRANSACTION';

export const transactions = createReducer([], {
  [SET_TRANSACTIONS](state, action) {
    return action.transactions;
  },

  [NEW_TRANSACTION](state, action) {
    return [...state, action.transaction];
  },

  [REMOVE_TRANSACTION](state, action) {
    return [...state].filter((t) => t._id !== action.transactionId);
  }
});

const setTransactions = (transactions) => ({ type: SET_TRANSACTIONS, transactions });

export const newTransaction = (transaction) => ({ type: NEW_TRANSACTION, transaction });

export const removeTransaction = (transactionId) => ({ type: REMOVE_TRANSACTION, transactionId });

export const fetchTransactions = () => {
  return async (dispatch) => {
    try {
      const transactions = await getTransactions();
      dispatch(setTransactions(transactions));
    } catch (error) {
      dispatch(
        setAlert({
          type: 'Error',
          message: 'Oops! Transactions rejected the request'
        })
      );
    }
  };
};
