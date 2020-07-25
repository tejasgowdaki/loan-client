import React from "react";
import { Table, Button } from "semantic-ui-react";

import TableRow from "./tableRow";

const MemberTable = ({
  members,
  savings,
  openDepositForm,
  toggleForm,
  promptDeleteModal,
  isDisabled
}) => {
  return (
    <Table celled striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan="3">
            Members
            <span textalign="right" style={{ paddingLeft: "2.5em " }}>
              <Button
                as="a"
                size="mini"
                secondary
                onClick={() => toggleForm()}
                disabled={isDisabled}
              >
                Add
              </Button>
            </span>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {members.map(member => (
          <TableRow
            key={member._id}
            name={member.name}
            mobile={member.mobile}
            savings={(savings[member._id] || {}).totalSaving || 0}
            openDepositForm={() => openDepositForm(member)}
            toggleForm={() => toggleForm(member)}
            promptDeleteModal={() => promptDeleteModal(member)}
            isDisabled={isDisabled}
          />
        ))}
      </Table.Body>
    </Table>
  );
};

export default MemberTable;
