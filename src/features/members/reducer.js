import createReducer from '../../store/createReducer';

import { getMembers } from './api';

import { setAlert } from '../alert/reducer';

const SET_MEMBERS = 'SET_MEMBERS';
const NEW_MEMBER = 'NEW_MEMBER';
const UPSERT_MEMBER = 'UPSERT_MEMBER';
const REMOVE_MEMBER = 'REMOVE_MEMBER';

export const members = createReducer([], {
  [SET_MEMBERS](state, action) {
    return action.members;
  },

  [NEW_MEMBER](state, action) {
    return [...state, action.member];
  },

  [UPSERT_MEMBER](state, action) {
    let members = [...state];
    const index = members.findIndex((m) => m._id === action.member._id);
    if (index >= 0) {
      members[index] = action.member;
    } else {
      members.push(action.member);
    }
    return members;
  },

  [REMOVE_MEMBER](state, action) {
    return [...state].filter((m) => m._id !== action.memberId);
  }
});

const setMembers = (members) => ({ type: SET_MEMBERS, members });

export const newMember = (member) => ({ type: NEW_MEMBER, member });

export const upsertMember = (member) => ({ type: UPSERT_MEMBER, member });

export const removeMember = (memberId) => ({ type: REMOVE_MEMBER, memberId });

export const fetchMembers = () => {
  return async (dispatch) => {
    try {
      const members = await getMembers();
      dispatch(setMembers(members));
    } catch (error) {
      dispatch(
        setAlert({
          type: 'Error',
          message: 'Oops! Members rejected the request'
        })
      );
    }
  };
};

// search text
const SET_SEARCH_TEXT = 'SET_SEARCH_TEXT';

export const searchText = createReducer('', {
  [SET_SEARCH_TEXT](state, action) {
    return action.searchText;
  }
});

export const setSearchText = (searchText) => {
  return { type: SET_SEARCH_TEXT, searchText };
};
