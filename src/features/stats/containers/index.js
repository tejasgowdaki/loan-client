import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Icon } from 'semantic-ui-react';

import { getStats } from '../api';

import { setAlert } from '../../alert/reducer';

class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: 0,
      savings: 0,
      loan: { amount: 0, paidAmount: 0, paidInterest: 0 },
      isDisabled: false
    };
  }

  componentDidMount = () => {
    this.fetchStats();
  };

  fetchStats = async () => {
    try {
      this.setState({ isDisabled: true });
      const { members, savings, loan } = await getStats();

      this.setState({ isDisabled: false, members, savings, loan });
    } catch (error) {
      this.props.setAlert({ type: 'Error', message: error.message });
      this.setState({ isDisabled: false });
    }
  };

  render() {
    const { members, savings, loan } = this.state;
    return (
      <Card.Group style={{ margin: '0.25em' }}>
        <Card>
          <Card.Content style={{ background: '#000', color: 'white' }} header>
            Members
          </Card.Content>
          <Card.Content description>{members}</Card.Content>
        </Card>

        <Card>
          <Card.Content style={{ background: '#000', color: 'white' }} header>
            Savings
          </Card.Content>
          <Card.Content description>
            <Icon name="rupee sign" /> {savings}
          </Card.Content>
        </Card>

        <Card>
          <Card.Content style={{ background: '#000', color: 'white' }} header>
            Loan granted
          </Card.Content>
          <Card.Content description>
            <Icon name="rupee sign" /> {loan.amount}
          </Card.Content>
        </Card>

        <Card>
          <Card.Content style={{ background: '#000', color: 'white' }} header>
            Loan recovered
          </Card.Content>
          <Card.Content description>
            <Icon name="rupee sign" /> {loan.paidAmount}
          </Card.Content>
        </Card>

        <Card>
          <Card.Content style={{ background: '#000', color: 'white' }} header>
            Interest collected
          </Card.Content>
          <Card.Content description>
            <Icon name="rupee sign" /> {loan.paidInterest}
          </Card.Content>
        </Card>
      </Card.Group>
    );
  }
}

const mapDispatchToProps = { setAlert };

export default connect(null, mapDispatchToProps)(Stats);
