import { combineReducers } from "redux";

import { alert } from "../features/alert/reducer";
import { members } from "../features/members/reducer";

export default combineReducers({ alert, members });
