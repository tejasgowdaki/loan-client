import { combineReducers } from "redux";

import { alert } from "../features/alert/reducer";

export default combineReducers(Object.assign({ alert }));
