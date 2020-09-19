import React from 'react';
import { Table, Icon, Button, Header } from 'semantic-ui-react';
import moment from 'moment';

import { formatAmount } from '../../../helpers/utils';

const DepositTable = ({ deposits = [], deleteDeposit, isDisabled, isAccountTypeLoan }) => {
  if (!deposits.length) return <Header as="h5">No {isAccountTypeLoan ? 'deposits' : 'payments'} made yet</Header>;

  return (
    <Table unstackable collapsing striped celled size="small" style={{ width: 'rem' }}>
      <Table.Header>
        <Table.Row textAlign="left">
          <Table.HeaderCell>Sl.</Table.HeaderCell>
          <Table.HeaderCell>Date</Table.HeaderCell>
          <Table.HeaderCell>
            Amount <br />(<Icon name="rupee sign" />)
          </Table.HeaderCell>
          <Table.HeaderCell>Action</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {deposits.map(({ _id, amount = 0, date }, index) => (
          <Table.Row key={_id} textAlign="left">
            <Table.Cell>{index + 1}</Table.Cell>
            <Table.Cell>{moment(date).format('Do MMM YYYY')}</Table.Cell>
            <Table.Cell>{formatAmount(amount)}</Table.Cell>

            <Table.Cell>
              <Button
                as="a"
                floated="right"
                size="mini"
                color="red"
                onClick={() => deleteDeposit(_id)}
                disabled={isDisabled}
              >
                Delete
              </Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default DepositTable;
