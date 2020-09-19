import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

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

import { AccountTypeContext } from './context';

import { LOAN } from './constants';

class App extends Component {
  componentDidMount = () => {
    const token = localStorage.getItem('XFLK');

    if (token) {
      this.setUser(token);
    } else {
      this.props.setLoading(false);
    }
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
        <AccountTypeContext.Provider value={this.props.isAccountTypeLoan}>
          {this.props.isLoading ? (
            <Loading />
          ) : this.props.activeAccountId ? (
            <Routes
              accountName={this.props.accountName}
              accountStartDate={this.props.accountStartDate}
              logout={this.logout}
            />
          ) : (
            <AuthRoutes />
          )}
        </AccountTypeContext.Provider>
        <Alert />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ isLoading, account, user }) => ({
  activeAccountId: (user || {}).activeAccountId,
  accountName: (account || {}).name,
  accountStartDate: account && account.startDate ? moment(account.startDate).format('Do MMM YYYY') : null,
  isAccountTypeLoan: LOAN === (account || {}).type,
  isLoading
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
