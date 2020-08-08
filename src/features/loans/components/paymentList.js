import React from 'react';
import { Card, Button, Label, Icon } from 'semantic-ui-react';
import moment from 'moment';

const PaymentList = ({ payments, deletePayment, isDisabled }) => {
  if (!payments.length) return <div>No payments found</div>;

  return (
    <Card.Group style={{ marginBottom: '2em' }}>
      {payments.map(({ _id, amount, interest = 0, date }, index) => (
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
                onClick={() => deletePayment(_id)}
                disabled={isDisabled}
              >
                Delete Payment
              </Button>
            </Card.Header>

            <Card.Header style={{ margin: '1em' }}>
              <Label style={{ margin: '0.25em' }}>Date: {moment(date).format('DD MMMM YYYY')}</Label>

              <Label style={{ margin: '0.25em' }}>
                Amount: <Icon name="rupee sign" />
                {amount}
              </Label>

              <Label style={{ margin: '0.25em' }}>
                Interest: <Icon name="rupee sign" />
                {interest}
              </Label>

              <Label style={{ margin: '0.25em' }}>
                Total: <Icon name="rupee sign" />
                {amount + interest}
              </Label>
            </Card.Header>
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  );
};

export default PaymentList;
