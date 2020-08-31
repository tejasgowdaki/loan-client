import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Alert from './features/alert';

import { fetchMembers } from './features/members/reducer';
import { fetchSavings } from './features/savings/reducer';
import { fetchLoans } from './features/loans/reducer';
import { fetchTransactions } from './features/transaction/reducer';
import { setAccount } from './features/account/reducer';

import { fetchAccountFromToken } from './helpers/auth';

import { Routes } from './routes';
import { AuthRoutes } from './routes/auth';

class App extends Component {
  componentDidMount = () => {
    const token = localStorage.getItem('XFLK');

    if (token) {
      const account = fetchAccountFromToken(token);
      this.props.setAccount({ ...account, token });
      this.fetchData();
    }
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.isActiveSession && this.props.isActiveSession) this.fetchData();
  }

  fetchData = () => {
    this.props.fetchMembers();
    this.props.fetchSavings();
    this.props.fetchLoans();
    this.props.fetchTransactions();
  };

  logout = async () => {
    try {
      this.props.setAccount(null);
      localStorage.removeItem('XFLK');
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <Fragment>
        <Alert />
        {this.props.isActiveSession ? <Routes name={this.props.name} logout={this.logout} /> : <AuthRoutes />}
      </Fragment>
    );
  }
}

const mapStateToProps = ({ account }) => ({ isActiveSession: !!account, name: (account || {}).name });

const mapDispatchToProps = { fetchMembers, fetchSavings, fetchLoans, setAccount, fetchTransactions };

export default connect(mapStateToProps, mapDispatchToProps)(App);
