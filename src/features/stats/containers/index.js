import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tab, Menu, Header } from 'semantic-ui-react';
import { WhatsappIcon, WhatsappShareButton } from 'react-share';
import moment from 'moment';

import AllTime from '../components/allTime';
import Month from '../components/month';

import { getStats } from '../api';

import { setAlert } from '../../alert/reducer';

import { formatAmount } from '../../../helpers/utils';

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
      activeIndex: 0,
      month: moment().format('YYYY-MM')
    };
  }

  componentDidMount = () => {
    this.fetchStats();
  };

  onTabChange = (event, data) => this.setState({ activeIndex: data.activeIndex });

  fetchStats = async (isOnlyMonth = false, month = null) => {
    try {
      this.setState({ isDisabled: true });
      const stats = await getStats(isOnlyMonth, month);

      this.setState({ isDisabled: false, ...stats });
    } catch (error) {
      this.props.setAlert({ type: 'Error', message: error.message });
      this.setState({ isDisabled: false });
    }
  };

  constructWhatsAppMessage = (accountName, members, savings, loan, transaction) => {
    const profit = savings + loan.paidInterest + transaction.income - transaction.expense;
    const profitPerMember = parseInt(profit / members);

    return `Hello, here is the profit details of ${accountName} \nTotal Profit - ₹ ${formatAmount(
      profit
    )} \nProfit per Member - ₹ ${formatAmount(profitPerMember)}`;
  };

  onChangeMonth = (e) => {
    this.setState({ month: e.target.value });
    this.fetchStats(true, e.target.value);
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
      monthlyTransaction,
      month
    } = this.state;

    const whatsMessageTitle = this.constructWhatsAppMessage(
      this.props.accountName,
      members,
      savings,
      loan,
      transaction
    );

    const panes = [
      {
        menuItem: (
          <Menu.Item key="all-time">
            <Header as="h3" style={{ paddingRight: '1em' }}>
              All Time
            </Header>

            <WhatsappShareButton url={' '} title={whatsMessageTitle} separator="">
              <WhatsappIcon size={30} round={true} />
            </WhatsappShareButton>
          </Menu.Item>
        )
      },
      {
        menuItem: (
          <Menu.Item key="current-month">
            <Header as="h3" style={{ paddingRight: '1em' }}>
              Current Month
            </Header>
            {/* <WhatsappShareButton url={this.props.accountName} title={'whatsMessageTitle'} separator=" -">
              <WhatsappIcon size={30} round={true} />
            </WhatsappShareButton> */}
          </Menu.Item>
        )
      }
    ];

    return (
      <>
        <Tab menu={{ secondary: true, pointing: true }} panes={panes} onTabChange={this.onTabChange} />

        {activeIndex === 0 ? (
          <AllTime members={members} savings={savings} loan={loan} transaction={transaction} />
        ) : null}

        {activeIndex === 1 ? (
          <Month
            savings={monthlySavings}
            loan={monthlyLoan}
            transaction={monthlyTransaction}
            month={month}
            onChangeMonth={this.onChangeMonth}
          />
        ) : null}
      </>
    );
  }
}

const mapStateToProps = ({ account }) => ({
  accountName: (account || {}).name || 'N/A'
});

const mapDispatchToProps = { setAlert };

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
