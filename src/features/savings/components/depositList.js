import React from 'react';
import { Card, Button, Label } from 'semantic-ui-react';
import moment from 'moment';

const DepositList = ({ deposits, deleteDeposit, isDisabled }) => {
  if (!deposits.length) return <div>No deposits found</div>;

  return (
    <Card.Group style={{ marginBottom: '2em' }}>
      {deposits.map(({ _id, amount, date }, index) => (
        <Card key={_id} style={{ minWidth: 330 }}>
          <Card.Content>
            <Card.Header>
              <Label float="left">{moment(date).format('DD MMMM YYYY')}</Label>

              <Label float="right">Rs. {amount}</Label>

              <Button floated="right" size="mini" color="red" onClick={() => deleteDeposit(_id)} disabled={isDisabled}>
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
