import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "semantic-ui-css/semantic.min.css";
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import './index.css'

import store from "./store/index";
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
