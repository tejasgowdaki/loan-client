import { combineReducers } from 'redux';

import { alert } from '../features/alert/reducer';
import { members, searchText } from '../features/members/reducer';
import { savings } from '../features/savings/reducer';
import { loans } from '../features/loans/reducer';

export default combineReducers({ alert, loans, members, savings, searchText });
