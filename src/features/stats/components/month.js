import React from 'react';
import { Card, Icon, Form } from 'semantic-ui-react';
import moment from 'moment';

import { formatAmount } from '../../../helpers/utils';

const Month = ({
  savings = 0,
  loan = { paidInterest: 0, paidAmount: 0, amount: 0 },
  transaction = { income: 0, expense: 0 },
  month,
  onChangeMonth
}) => {
  const purseAmount =
    savings - loan.amount + loan.paidAmount + loan.paidInterest + transaction.income - transaction.expense;

  return (
    <>
      <Form.Group widths="equal" style={{ margin: '0.50em' }}>
        <Form.Field fluid className="date-picker" id="date-picker">
          <label style={{ margin: '0.50em' }}>Select Month</label>

          <input
            autoComplete="off"
            placeholder="month"
            name="month"
            value={month}
            onChange={onChangeMonth}
            style={{ maxWidth: '300px', minHeight: '20px' }}
            type="month"
          />

          <br />

          <span style={{ marginTop: '2em', marginLeft: '0.5em' }}>
            Data showing for month: <b>{moment(month, 'YYYY-MM').format('MMMM YYYY')}</b>
          </span>
        </Form.Field>
      </Form.Group>

      <Card.Group style={{ margin: '0.25em' }}>
        <Card>
          <Card.Content style={{ background: '#000', color: 'white' }}>Amount in purse</Card.Content>
          <Card.Content>
            <Icon name="rupee sign" /> {formatAmount(purseAmount)}
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
    </>
  );
};

export default Month;
