import createReducer from "../../store/createReducer";

// Alert Action Type
const SET_ALERT = "SET_ALERT";

// Alert Reducer
export const alert = createReducer(null, {
  [SET_ALERT](state, action) {
    return action.alert;
  }
});

// Alert Actions
export const setAlert = alert => ({ type: SET_ALERT, alert });
