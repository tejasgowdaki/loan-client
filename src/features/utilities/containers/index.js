import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'semantic-ui-react';

import DepositForm from '../../savings/components/depositForm';

import { bulkDeposit } from '../../savings/api';

import { setSavings } from '../../savings/reducer';

import { setAlert } from '../../alert/reducer';

class Utilities extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: false,
      isShowDepositForm: false
    };
  }

  toggleDepositForm = () => this.setState({ isShowDepositForm: !this.state.isShowDepositForm });

  submitDeposit = async (amount, date) => {
    try {
      this.setState({ isDisabled: true });
      const savings = await bulkDeposit({ amount, date });
      this.props.setSavings(savings);
      this.props.setAlert({
        type: 'Success',
        message: `Successfully deposited ₹ ${amount} for all the members`
      });
      this.setState({ isDisabled: false, isShowDepositForm: false });
    } catch (error) {
      this.props.setAlert({ type: 'Error', message: error.message });
      this.setState({ isDisabled: false });
    }
  };

  render() {
    const { isDisabled, isShowDepositForm } = this.state;

    return (
      <>
        <Table unstackable collapsing celled structured compact size="small" style={{ width: 'rem' }}>
          <Table.Header>
            <Table.Row textAlign="left">
              <Table.HeaderCell>Sl.</Table.HeaderCell>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row textAlign="left">
              <Table.Cell>1</Table.Cell>
              <Table.Cell>Add savings to all your members</Table.Cell>
              <Table.Cell>
                <Button
                  as="a"
                  floated="right"
                  size="mini"
                  color="blue"
                  onClick={this.toggleDepositForm}
                  disabled={isDisabled}
                  style={{ marginTop: '0.1em' }}
                >
                  Add
                </Button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>

        {isShowDepositForm ? (
          <DepositForm
            title="Add saving to all members"
            onClose={this.toggleDepositForm}
            onSubmit={this.submitDeposit}
            isDisabled={isDisabled}
          />
        ) : null}
      </>
    );
  }
}

const mapDispatchToProps = {
  setAlert,
  setSavings
};

export default connect(null, mapDispatchToProps)(Utilities);
