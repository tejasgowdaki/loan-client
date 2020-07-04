import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger"; // TODO: comment when pushing to production

import reducer from "./reducers";

let middleware = [thunk];

middleware = [...middleware, logger]; // TODO: comment when pushing to production

const store = createStore(reducer, applyMiddleware(...middleware));

export default store;
