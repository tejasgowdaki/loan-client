import { combineReducers } from "redux";

import { alert } from "../features/alert/reducer";
import { members } from "../features/members/reducer";
import { savings } from "../features/savings/reducer";

export default combineReducers({ alert, members, savings });
