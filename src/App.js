import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Loading from './routes/loading';

import Alert from './features/alert';

import { fetchMembers } from './features/members/reducer';
import { fetchSavings } from './features/savings/reducer';
import { fetchLoans } from './features/loans/reducer';
import { fetchTransactions } from './features/transaction/reducer';
import { fetchAccounts, setUser, setLoading } from './features/account/reducer';

import { fetchDateFromToken } from './helpers/auth';

import { Routes } from './routes';
import { AuthRoutes } from './routes/auth';

class App extends Component {
  componentDidMount = () => {
    const token = localStorage.getItem('XFLK');

    if (token) this.setUser(token);
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.activeAccountId &&
      (!prevProps.activeAccountId || prevProps.activeAccountId !== this.props.activeAccountId)
    ) {
      this.fetchData();
    }
  }

  setUser = async (token) => {
    const tokenObject = fetchDateFromToken(token);
    this.props.setUser({ ...tokenObject, token });
    this.fetchData();
  };

  fetchData = () => {
    this.props.setLoading(true);
    this.props.fetchAccounts(this.props.activeAccountId);
    this.props.fetchMembers();
    this.props.fetchSavings();
    this.props.fetchLoans();
    this.props.fetchTransactions();
  };

  logout = async () => {
    try {
      this.props.setUser(null);
      localStorage.removeItem('XFLK');
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <Fragment>
        <Alert />
        {this.props.isLoading ? (
          <Loading />
        ) : this.props.activeAccountId ? (
          <Routes name={this.props.name} logout={this.logout} />
        ) : (
          <AuthRoutes />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = ({ isLoading, account, user }) => ({
  activeAccountId: (user || {}).activeAccountId,
  name: (account || {}).name
});

const mapDispatchToProps = {
  fetchMembers,
  fetchSavings,
  fetchLoans,
  fetchAccounts,
  fetchTransactions,
  setUser,
  setLoading
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
