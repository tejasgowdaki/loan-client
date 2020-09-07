import React from 'react';
import { Card, Button, Label, Icon } from 'semantic-ui-react';
import moment from 'moment';

const DepositList = ({ deposits, deleteDeposit, isDisabled }) => {
  if (!deposits.length) return <div>No deposits found</div>;

  return (
    <Card.Group style={{ marginBottom: '2em' }}>
      {deposits.map(({ _id, amount, date }, index) => (
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
                onClick={() => deleteDeposit(_id)}
                disabled={isDisabled}
              >
                Delete Deposit
              </Button>
            </Card.Header>

            <Card.Header style={{ margin: '1em' }}>
              <Label style={{ margin: '0.25em' }}>Date: {moment(date).format('D MMM YYYY')}</Label>

              <Label style={{ margin: '0.25em' }}>
                Amount: <Icon name="rupee sign" />
                {amount}
              </Label>
            </Card.Header>
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  );
};

export default DepositList;
