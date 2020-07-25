import React from "react";
import { Table, Icon } from "semantic-ui-react";

const TableRow = ({
  name,
  mobile,
  savings,
  openDepositForm,
  toggleForm,
  promptDeleteModal,
  isDisabled
}) => {
  return (
    <Table.Row>
      <Table.Cell collapsing>
        <span style={{ paddingRight: "3em " }}>
          <Icon name="user" /> {name}
        </span>

        <span style={{ paddingRight: "3em " }}>
          <Icon name="mobile" /> {mobile}
        </span>
      </Table.Cell>

      <Table.Cell collapsing>
        <span>Savings (Rs.): {savings} </span>
      </Table.Cell>

      <Table.Cell textAlign="right">
        <Icon
          style={{ paddingRight: "2.5em " }}
          name="currency"
          onClick={openDepositForm}
          disabled={isDisabled}
        />

        <Icon
          style={{ paddingRight: "2.5em " }}
          name="pencil"
          onClick={toggleForm}
          disabled={isDisabled}
        />

        <Icon
          style={{ paddingRight: "2.5em ", color: "red" }}
          name="trash"
          onClick={promptDeleteModal}
          disabled={isDisabled}
        />
      </Table.Cell>
    </Table.Row>
  );
};

export default TableRow;
