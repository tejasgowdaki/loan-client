import createReducer from '../../store/createReducer';

import { getSavings } from './api.js';

import { setAlert } from '../alert/reducer';

const SET_SAVINGS = 'SET_SAVINGS';
const NEW_SAVING = 'NEW_SAVING';
const UPSERT_SAVING = 'UPSERT_SAVING';
const REMOVE_SAVING = 'REMOVE_SAVING';

export const savings = createReducer([], {
  [SET_SAVINGS](state, action) {
    return action.savings;
  },

  [NEW_SAVING](state, action) {
    return [...state, action.saving];
  },

  [UPSERT_SAVING](state, action) {
    let savings = [...state];
    const index = savings.findIndex((s) => s._id === action.saving._id);
    if (index >= 0) {
      savings[index] = action.saving;
    } else {
      savings.push(action.saving);
    }
    return savings;
  },

  [REMOVE_SAVING](state, action) {
    return [...state].filter((s) => s._id !== action.savingId);
  }
});

export const setSavings = (savings) => ({ type: SET_SAVINGS, savings });

export const newSaving = (saving) => ({ type: NEW_SAVING, saving });

export const upsertSaving = (saving) => ({ type: UPSERT_SAVING, saving });

export const removeSaving = (savingId) => ({ type: REMOVE_SAVING, savingId });

export const fetchSavings = () => {
  return async (dispatch, getState) => {
    try {
      const savings = await getSavings();
      dispatch(setSavings(savings));
    } catch (error) {
      dispatch(
        setAlert({
          type: 'Error',
          message: 'Oops! Savings rejected the request'
        })
      );
    }
  };
};
