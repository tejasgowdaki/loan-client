import React from 'react';
import { Card, Button, Label, Icon } from 'semantic-ui-react';
import moment from 'moment';

const TransactionList = ({ type, transactions, openForm, deleteTransaction, isDisabled }) => {
  return (
    <>
      <Card style={{ width: 'auto' }}>
        <Card.Content>
          <Card.Header>
            {`Account's ${type}`}
            <Button
              as="a"
              floated="right"
              size="mini"
              color="blue"
              onClick={() => openForm(type)}
              disabled={isDisabled}
            >
              {`Add ${type}`}
            </Button>
          </Card.Header>
        </Card.Content>
      </Card>

      {transactions.length ? (
        <Card.Group style={{ marginBottom: '2em' }}>
          {transactions.map(({ _id, amount, date }, index) => (
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
                    onClick={() => deleteTransaction(_id)}
                    disabled={isDisabled}
                  >
                    Delete Transaction
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
      ) : (
        <div>{`No ${type} transactions found`}</div>
      )}
    </>
  );
};

export default TransactionList;
