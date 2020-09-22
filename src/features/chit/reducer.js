import createReducer from '../../store/createReducer';

import { getChits } from './api';

import { setAlert } from '../alert/reducer';

const SET_CHITS = 'SET_CHITS';
const NEW_CHIT = 'NEW_CHIT';
const REMOVE_CHIT = 'REMOVE_CHIT';

export const chits = createReducer([], {
  [SET_CHITS](state, action) {
    return action.chits;
  },

  [NEW_CHIT](state, action) {
    return [...state, action.chit];
  },

  [REMOVE_CHIT](state, action) {
    return [...state].filter((c) => c._id !== action.chitId);
  }
});

const setChits = (chits) => ({ type: SET_CHITS, chits });

export const newChit = (chit) => ({ type: NEW_CHIT, chit });

export const removeChit = (chitId) => ({ type: REMOVE_CHIT, chitId });

export const fetchChits = () => {
  return async (dispatch) => {
    try {
      const chits = await getChits();
      dispatch(setChits(chits));
    } catch (error) {
      dispatch(setAlert({ type: 'Error', message: 'Oops! Chits rejected the request' }));
    }
  };
};
