import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Alert from './features/alert';

import { fetchMembers } from './features/members/reducer';
import { fetchSavings } from './features/savings/reducer';

import { Routes } from './routes';

class App extends Component {
  componentDidMount = () => {
    this.props.dispatch(fetchMembers());
    this.props.dispatch(fetchSavings());
  };

  render() {
    return (
      <Fragment>
        <Alert />
        <Routes />
      </Fragment>
    );
  }
}

export default connect()(App);
