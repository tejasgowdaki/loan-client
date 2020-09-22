import React from 'react';
import { Table, Icon, Button, Header } from 'semantic-ui-react';
import moment from 'moment';

import { formatAmount } from '../../../helpers/utils';

const TransactionTable = ({ type, transactions = [], openForm, deleteTransaction, isDisabled }) => {
  return (
    <Table unstackable collapsing striped celled size="small" style={{ width: 'rem' }}>
      <Table.Header>
        <Table.Row textAlign="left">
          <Table.HeaderCell colSpan="3">{`Account's ${type}`}</Table.HeaderCell>
          <Table.HeaderCell colSpan="2">
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
          </Table.HeaderCell>
        </Table.Row>
        <Table.Row textAlign="left">
          <Table.HeaderCell>Sl.</Table.HeaderCell>
          <Table.HeaderCell>Date</Table.HeaderCell>
          <Table.HeaderCell>
            Amount <br />(<Icon name="rupee sign" />)
          </Table.HeaderCell>
          <Table.HeaderCell>Comment</Table.HeaderCell>
          <Table.HeaderCell>Action</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      {transactions.length ? (
        <Table.Body>
          {transactions.map(({ _id, amount, date, comment }, index) => (
            <Table.Row key={_id} textAlign="left">
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>{moment(date).format('Do MMM YYYY')}</Table.Cell>
              <Table.Cell>{formatAmount(amount)}</Table.Cell>
              <Table.Cell>{comment}</Table.Cell>

              <Table.Cell>
                <Button
                  as="a"
                  floated="right"
                  size="mini"
                  color="red"
                  onClick={() => deleteTransaction(_id)}
                  disabled={isDisabled}
                >
                  Delete
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      ) : (
        <Header as="h5">{`No ${type} transactions found`}</Header>
      )}
    </Table>
  );
};

export default TransactionTable;
