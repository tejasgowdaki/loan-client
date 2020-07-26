import createReducer from '../../store/createReducer';

import { getLoans } from './api';

import { setAlert } from '../alert/reducer';

const SET_LOANS = 'SET_LOANS';
const NEW_LOAN = 'NEW_LOAN';
const UPSERT_LOAN = 'UPSERT_LOAN';
const REMOVE_LOAN = 'REMOVE_LOAN';

export const loans = createReducer([], {
  [SET_LOANS](state, action) {
    return action.loans;
  },

  [NEW_LOAN](state, action) {
    return [...state, action.loan];
  },

  [UPSERT_LOAN](state, action) {
    let loans = [...state];
    const index = loans.findIndex((l) => l._id === action.loan._id);
    if (index >= 0) {
      loans[index] = action.loan;
    } else {
      loans.push(action.loan);
    }
    return loans;
  },

  [REMOVE_LOAN](state, action) {
    return [...state].filter((l) => l._id !== action.loanId);
  }
});

const setLoans = (loans) => ({ type: SET_LOANS, loans });

export const newLoan = (loan) => ({ type: NEW_LOAN, loan });

export const upsertLoan = (loan) => ({ type: UPSERT_LOAN, loan });

export const removeLoan = (loanId) => ({ type: REMOVE_LOAN, loanId });

export const fetchLoans = () => {
  return async (dispatch) => {
    try {
      const loans = await getLoans();
      dispatch(setLoans(loans));
    } catch (error) {
      dispatch(
        setAlert({
          type: 'Error',
          message: 'Oops! Loans rejected the request'
        })
      );
    }
  };
};
