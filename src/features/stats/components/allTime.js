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
  const profitPerMember = profit && members ? parseInt(profit / members) : 0;

  const profitWithOutTransaction = savings + loan.paidInterest;
  const profitPerMemberWithOutTransaction =
    profitWithOutTransaction && members ? parseInt(profitWithOutTransaction / members) : 0;

  const purseAmount =
    savings - loan.amount + loan.paidAmount + loan.paidInterest + transaction.income - transaction.expense;

  return (
    <Card.Group style={{ margin: '0.25em' }}>
      <Card>
        <Card.Content style={{ background: '#000', color: 'white' }}>Members</Card.Content>
        <Card.Content>{members}</Card.Content>
      </Card>

      <Card>
        <Card.Content style={{ background: '#000', color: 'white' }}>Amount in purse</Card.Content>
        <Card.Content>
          <Icon name="rupee sign" /> {formatAmount(purseAmount)}
        </Card.Content>
      </Card>

      <Card>
        <Card.Content style={{ background: '#000', color: 'white' }}>Profit</Card.Content>
        <Card.Content>
          <Icon name="rupee sign" /> {formatAmount(profit)}
        </Card.Content>
      </Card>

      <Card>
        <Card.Content style={{ background: '#000', color: 'white' }}>Profit per member</Card.Content>
        <Card.Content>
          <Icon name="rupee sign" /> {formatAmount(profitPerMember)}
        </Card.Content>
      </Card>

      <Card>
        <Card.Content style={{ background: '#000', color: 'white' }}>Profit (without transactions)</Card.Content>
        <Card.Content>
          <Icon name="rupee sign" /> {formatAmount(profitWithOutTransaction)}
        </Card.Content>
      </Card>

      <Card>
        <Card.Content style={{ background: '#000', color: 'white' }}>
          Profit per member (without transactions)
        </Card.Content>
        <Card.Content>
          <Icon name="rupee sign" /> {formatAmount(profitPerMemberWithOutTransaction)}
        </Card.Content>
      </Card>

      <Card>
        <Card.Content style={{ background: '#000', color: 'white' }}>Savings</Card.Content>
        <Card.Content>
          <Icon name="rupee sign" /> {formatAmount(savings)}
        </Card.Content>
      </Card>

      <Card>
        <Card.Content style={{ background: '#000', color: 'white' }}>Loan granted</Card.Content>
        <Card.Content>
          <Icon name="rupee sign" /> {formatAmount(loan.amount)}
        </Card.Content>
      </Card>

      <Card>
        <Card.Content style={{ background: '#000', color: 'white' }}>Loan recovered</Card.Content>
        <Card.Content>
          <Icon name="rupee sign" /> {formatAmount(loan.paidAmount)}
        </Card.Content>
      </Card>

      <Card>
        <Card.Content style={{ background: '#000', color: 'white' }}>Loan pending</Card.Content>
        <Card.Content>
          <Icon name="rupee sign" /> {formatAmount(loan.amount - loan.paidAmount)}
        </Card.Content>
      </Card>

      <Card>
        <Card.Content style={{ background: '#000', color: 'white' }}>Interest collected</Card.Content>
        <Card.Content>
          <Icon name="rupee sign" /> {formatAmount(loan.paidInterest)}
        </Card.Content>
      </Card>

      <Card>
        <Card.Content style={{ background: '#000', color: 'white' }}>Other Income</Card.Content>
        <Card.Content>
          <Icon name="rupee sign" /> {formatAmount(transaction.income)}
        </Card.Content>
      </Card>

      <Card>
        <Card.Content style={{ background: '#000', color: 'white' }}>Other Expense</Card.Content>
        <Card.Content>
          <Icon name="rupee sign" /> {formatAmount(transaction.expense)}
        </Card.Content>
      </Card>
    </Card.Group>
  );
};

export default AllTime;
