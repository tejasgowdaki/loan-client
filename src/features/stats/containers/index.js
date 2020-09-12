import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tab } from 'semantic-ui-react';

import AllTime from '../components/allTime';
import Month from '../components/month';

import { getStats } from '../api';

import { setAlert } from '../../alert/reducer';

const panes = [{ menuItem: 'All Time' }, { menuItem: 'Current Month' }];

class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: 0,
      savings: 0,
      loan: { amount: 0, paidAmount: 0, paidInterest: 0 },
      transaction: { income: 0, expense: 0 },
      monthlySavings: 0,
      monthlyLoan: { amount: 0, paidAmount: 0, paidInterest: 0 },
      monthlyTransaction: { income: 0, expense: 0 },
      isDisabled: false,
      activeIndex: 0
    };
  }

  componentDidMount = () => {
    this.fetchStats();
  };

  onTabChange = (event, data) => this.setState({ activeIndex: data.activeIndex });

  fetchStats = async () => {
    try {
      this.setState({ isDisabled: true });
      const stats = await getStats();

      this.setState({ isDisabled: false, ...stats });
    } catch (error) {
      this.props.setAlert({ type: 'Error', message: error.message });
      this.setState({ isDisabled: false });
    }
  };

  render() {
    const {
      activeIndex,
      members,
      savings,
      loan,
      transaction,
      monthlySavings,
      monthlyLoan,
      monthlyTransaction
    } = this.state;

    return (
      <>
        <Tab menu={{ secondary: true, pointing: true }} panes={panes} onTabChange={this.onTabChange} />

        {activeIndex === 0 ? (
          <AllTime members={members} savings={savings} loan={loan} transaction={transaction} />
        ) : null}

        {activeIndex === 1 ? (
          <Month savings={monthlySavings} loan={monthlyLoan} transaction={monthlyTransaction} />
        ) : null}
      </>
    );
  }
}

const mapDispatchToProps = { setAlert };

export default connect(null, mapDispatchToProps)(Stats);
