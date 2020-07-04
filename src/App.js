import React, { Component, Fragment } from "react";

import Alert from "./features/alert";

import { Routes } from "./routes";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Alert />
        <Routes />
      </Fragment>
    );
  }
}

export default App;
