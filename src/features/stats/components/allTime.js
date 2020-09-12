import React from 'react';
import { Card, Icon } from 'semantic-ui-react';

import { formatAmount } from '../../../helpers/utils';

const AllTime = ({
  members = 0,
  savings = 0,
  loan = { paidInterest: 0, amount: 0 },
  transaction = { income: 0, expense: 0 }
}) => {
  const profit = savings + loan.paidInterest + transaction.income - transaction.expense;
  const profitPerMember = parseInt(profit / members);

  const profitWithOutTransaction = savings + loan.paidInterest;
  const profitPerMemberWithOutTransaction = parseInt(profitWithOutTransaction / members);

  const purseAmount = savings + loan.paidInterest + transaction.income - transaction.expense - loan.amount;

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
          Amount in purse
        </Card.Content>
        <Card.Content description>
          <Icon name="rupee sign" /> {formatAmount(purseAmount)}
        </Card.Content>
      </Card>

      <Card>
        <Card.Content style={{ background: '#000', color: 'white' }} header>
          Profit
        </Card.Content>
        <Card.Content description>
          <Icon name="rupee sign" /> {formatAmount(profit)}
        </Card.Content>
      </Card>

      <Card>
        <Card.Content style={{ background: '#000', color: 'white' }} header>
          Profit per member
        </Card.Content>
        <Card.Content description>
          <Icon name="rupee sign" /> {formatAmount(profitPerMember)}
        </Card.Content>
      </Card>

      <Card>
        <Card.Content style={{ background: '#000', color: 'white' }} header>
          Profit (without transactions)
        </Card.Content>
        <Card.Content description>
          <Icon name="rupee sign" /> {formatAmount(profitWithOutTransaction)}
        </Card.Content>
      </Card>

      <Card>
        <Card.Content style={{ background: '#000', color: 'white' }} header>
          Profit per member (without transactions)
        </Card.Content>
        <Card.Content description>
          <Icon name="rupee sign" /> {formatAmount(profitPerMemberWithOutTransaction)}
        </Card.Content>
      </Card>

      <Card>
        <Card.Content style={{ background: '#000', color: 'white' }} header>
          Savings
        </Card.Content>
        <Card.Content description>
          <Icon name="rupee sign" /> {formatAmount(savings)}
        </Card.Content>
      </Card>

      <Card>
        <Card.Content style={{ background: '#000', color: 'white' }} header>
          Loan granted
        </Card.Content>
        <Card.Content description>
          <Icon name="rupee sign" /> {formatAmount(loan.amount)}
        </Card.Content>
      </Card>

      <Card>
        <Card.Content style={{ background: '#000', color: 'white' }} header>
          Loan recovered
        </Card.Content>
        <Card.Content description>
          <Icon name="rupee sign" /> {formatAmount(loan.paidAmount)}
        </Card.Content>
      </Card>

      <Card>
        <Card.Content style={{ background: '#000', color: 'white' }} header>
          Loan pending
        </Card.Content>
        <Card.Content description>
          <Icon name="rupee sign" /> {formatAmount(loan.amount - loan.paidAmount)}
        </Card.Content>
      </Card>

      <Card>
        <Card.Content style={{ background: '#000', color: 'white' }} header>
          Interest collected
        </Card.Content>
        <Card.Content description>
          <Icon name="rupee sign" /> {formatAmount(loan.paidInterest)}
        </Card.Content>
      </Card>

      <Card>
        <Card.Content style={{ background: '#000', color: 'white' }} header>
          Other Income
        </Card.Content>
        <Card.Content description>
          <Icon name="rupee sign" /> {formatAmount(transaction.income)}
        </Card.Content>
      </Card>

      <Card>
        <Card.Content style={{ background: '#000', color: 'white' }} header>
          Other Expense
        </Card.Content>
        <Card.Content description>
          <Icon name="rupee sign" /> {formatAmount(transaction.expense)}
        </Card.Content>
      </Card>
    </Card.Group>
  );
};

export default AllTime;
