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
            <Card.Header>
              <Label float="left">Date: {moment(date).format('DD MMMM YYYY')}</Label>

              <Label float="right">
                Amount: <Icon name="rupee sign" />
                {amount}
              </Label>

              <Button
                as="a"
                style={{ marginLeft: '2em' }}
                floated="right"
                size="mini"
                color="red"
                onClick={() => deleteDeposit(_id)}
                disabled={isDisabled}
              >
                Delete
              </Button>
            </Card.Header>
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  );
};

export default DepositList;
