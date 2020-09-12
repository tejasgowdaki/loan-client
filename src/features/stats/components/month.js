import React from 'react';
import { Card, Icon } from 'semantic-ui-react';

import { formatAmount } from '../../../helpers/utils';

const Month = ({
  savings = 0,
  loan = { paidInterest: 0, paidAmount: 0, amount: 0 },
  transaction = { income: 0, expense: 0 }
}) => {
  return (
    <Card.Group style={{ margin: '0.25em' }}>
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

export default Month;
