import { combineReducers } from 'redux';

import { alert } from '../features/alert/reducer';
import { account } from '../features/account/reducer';
import { members, searchText } from '../features/members/reducer';
import { savings } from '../features/savings/reducer';
import { loans } from '../features/loans/reducer';
import { transactions } from '../features/transaction/reducer';

export default combineReducers({ alert, account, loans, members, savings, transactions, searchText });
