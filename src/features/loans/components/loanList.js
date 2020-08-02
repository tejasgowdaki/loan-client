import React from 'react';
import { Card, Button, Label, Icon } from 'semantic-ui-react';
import moment from 'moment';

const LoanList = ({ loans, isDisabled, deleteLoan }) => {
  if (!loans.length) return <div>No loans found</div>;

  return (
    <Card.Group style={{ marginBottom: '2em' }}>
      {loans.map(({ _id, amount, createdAt, paidAmount, paidInterest }, index) => (
        <Card key={_id} style={{ width: 'auto' }}>
          <Card.Content>
            <Card.Header style={{ margin: '1em' }}>
              <Label float="left">#{index + 1}</Label>

              <Button
                as="a"
                style={{ marginLeft: '2em' }}
                floated="right"
                size="mini"
                color="red"
                onClick={() => deleteLoan(_id)}
                disabled={isDisabled}
              >
                Delete
              </Button>

              <Button
                as="a"
                style={{ marginLeft: '2em' }}
                floated="right"
                size="mini"
                color="blue"
                // onClick={() => deleteDeposit(_id)}
                disabled={isDisabled}
              >
                Pay
              </Button>
            </Card.Header>

            <Card.Header style={{ margin: '1em' }}>
              <Label float="left">Date: {moment(createdAt).format('DD MMMM YYYY')}</Label>

              <Label float="right">
                Amount: <Icon name="rupee sign" />
                {amount}
              </Label>

              <Label float="right">
                Paid: <Icon name="rupee sign" />
                {paidAmount}
              </Label>

              <Label float="right">
                Interest: <Icon name="rupee sign" />
                {paidInterest}
              </Label>
            </Card.Header>
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  );
};

export default LoanList;
