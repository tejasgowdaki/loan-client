import React from 'react';
import { Table, Icon, Header } from 'semantic-ui-react';

import LoanRow from './loanRow';

const LoanTable = ({ loans }) => {
  if (!loans.length) return <Header as="h5">No loans present</Header>;

  return (
    <Table unstackable collapsing celled structured compact size="small" style={{ width: 'rem' }}>
      <Table.Header>
        <Table.Row textAlign="left">
          <Table.HeaderCell>Sl.</Table.HeaderCell>
          <Table.HeaderCell>
            Amount <br />(<Icon name="rupee sign" />)
          </Table.HeaderCell>
          <Table.HeaderCell>
            Paid <br />(<Icon name="rupee sign" />)
          </Table.HeaderCell>
          <Table.HeaderCell>
            Outstanding <br />(<Icon name="rupee sign" />)
          </Table.HeaderCell>
          <Table.HeaderCell>
            Paid <br /> Interest <br />(<Icon name="rupee sign" />)
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      {loans.map(({ _id }, index) => (
        <LoanRow slNumber={index + 1} loanId={_id} />
      ))}
    </Table>
  );
};

export default LoanTable;
