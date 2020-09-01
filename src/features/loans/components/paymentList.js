import React from 'react';
import { Card, Button, Label, Icon } from 'semantic-ui-react';
import moment from 'moment';

const PaymentList = ({ payments, deletePayment, isDisabled }) => {
  if (!payments.length) return <div>No payments found</div>;

  return (
    <Card.Group style={{ marginTop: '.1em' }}>
      {payments.map(({ _id, amount, interest = 0, date }, index) => (
        <Card key={_id} fluid>
          <Card.Content>
            <Card.Header>
              <Label float="left">#{index + 1}</Label>

              <Button
                as="a"
                floated="right"
                size="mini"
                color="red"
                onClick={() => deletePayment(_id)}
                disabled={isDisabled}
              >
                Delete Payment
              </Button>
            </Card.Header>

            <Card.Header style={{ marginTop: '0.2em' }}>
              <Label>Date: {moment(date).format('DD MMMM YYYY')}</Label>

              <Label>
                Amount: <Icon name="rupee sign" />
                {amount}
              </Label>

              <Label>
                Interest: <Icon name="rupee sign" />
                {interest}
              </Label>

              <Label>
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
