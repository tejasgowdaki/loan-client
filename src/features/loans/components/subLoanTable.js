import React from 'react';
import { Table, Icon, Button, Header } from 'semantic-ui-react';
import moment from 'moment';

const SubLoanTable = ({ subLoans = [], deleteSubLoan, isDisabled }) => {
  if (!subLoans.length) return <Header as="h5">No loans present made yet</Header>;

  return (
    <Table unstackable collapsing celled structured compact size="small">
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
        {subLoans.map(({ _id, amount = 0, date }, index) => (
          <Table.Row key={_id} textAlign="left">
            <Table.Cell>{index + 1}</Table.Cell>
            <Table.Cell>{moment(date).format('D MMM YYYY')}</Table.Cell>
            <Table.Cell>{amount}</Table.Cell>
            <Table.Cell>
              <Button
                as="a"
                floated="right"
                size="mini"
                color="red"
                onClick={() => deleteSubLoan({ _id })}
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

export default SubLoanTable;
