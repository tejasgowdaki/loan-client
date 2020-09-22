import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Table } from 'semantic-ui-react';

import ConfirmModal from '../../common/confirmModal';
import AccountForm from '../components/form';

import { switchAccount, createAccount, updateAccount } from '../api';

import { fetchAccounts, setUser, newAccount, upsertAccount } from '../reducer';
import { setAlert } from '../../alert/reducer';

import { fetchDateFromToken } from '../../../helpers/auth';

class Accounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: {},
      isDisabled: false,
      isShowSwitchModal: false,
      switchAccountId: null,
      switchAccountName: null
    };
  }

  componentDidMount = () => {
    this.props.fetchAccounts();
  };

  toggleSwitchModal = (switchAccountId = null, switchAccountName = null) =>
    this.setState({ isShowSwitchModal: !this.state.isShowSwitchModal, switchAccountId, switchAccountName });

  confirmSwitch = async (e) => {
    try {
      e.preventDefault();
      this.setState({ isDisabled: true });

      const token = await switchAccount({ accountId: this.state.switchAccountId });
      const tokenObject = fetchDateFromToken(token);
      this.props.setUser({ ...tokenObject, token });
      localStorage.setItem('XFLK', token);

      this.props.setAlert({ type: 'Success', message: 'Successfully switched account' });

      this.setState({ isShowSwitchModal: false, switchAccountId: null, switchAccountName: null, isDisabled: false });
    } catch (error) {
      this.props.setAlert({ type: 'Error', message: error.message });
      this.setState({ isDisabled: false });
    }
  };

  toggleForm = (object = null) => this.setState({ account: object || {}, isShowForm: !this.state.isShowForm });

  updateAccount = (key, value) => this.setState({ account: { ...this.state.account, [key]: value } });

  validate = () => {
    if (!this.state.account.name) return false;
    if (!this.state.account.type) return false;

    return true;
  };

  onSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!this.validate()) return;

      this.setState({ isDisabled: true });

      if (this.state.account._id) {
        // update account
        const account = await updateAccount(this.state.account._id, this.state.account);
        this.props.upsertAccount(account);
        this.props.setAlert({
          type: 'Success',
          message: `Successfully updated ${account.name}`
        });
      } else {
        // new account
        const account = await createAccount(this.state.account);
        this.props.newAccount(account);
        this.props.setAlert({
          type: 'Success',
          message: `Successfully created ${account.name}`
        });
      }

      this.toggleForm();
      this.setState({ isDisabled: false });
    } catch (error) {
      this.props.setAlert({ type: 'Error', message: error.message });
      this.setState({ isDisabled: false });
    }
  };

  render() {
    const { isDisabled, isShowSwitchModal, switchAccountName, isShowForm } = this.state;
    const { accounts, activeAccountId } = this.props;

    return (
      <>
        <Table unstackable collapsing striped celled size="small" style={{ width: 'rem' }}>
          <Table.Header>
            <Table.Row textAlign="left">
              <Table.HeaderCell colSpan="3">Accounts</Table.HeaderCell>
              <Table.HeaderCell>
                <Button as="a" floated="right" size="mini" color="blue" onClick={this.toggleForm} disabled={isDisabled}>
                  {`Add Account`}
                </Button>
              </Table.HeaderCell>
            </Table.Row>
            <Table.Row textAlign="left">
              <Table.HeaderCell>Sl.</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Type</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {accounts.map((account, index) => (
              <Table.Row key={account._id} textAlign="left">
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{account.name}</Table.Cell>
                <Table.Cell>{account.type}</Table.Cell>

                <Table.Cell>
                  {activeAccountId === account._id ? (
                    <Button as="a" floated="right" size="mini" color="green" disabled>
                      Active
                    </Button>
                  ) : (
                    <Button
                      as="a"
                      floated="right"
                      size="mini"
                      color="red"
                      onClick={() => this.toggleSwitchModal(account._id, account.name)}
                      disabled={isDisabled}
                    >
                      Switch
                    </Button>
                  )}

                  <Button
                    as="a"
                    floated="right"
                    size="mini"
                    color="blue"
                    onClick={() => this.toggleForm(account)}
                    disabled={isDisabled}
                  >
                    Edit
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

        {isShowSwitchModal ? (
          <ConfirmModal
            header={`Switch to account ${switchAccountName}!!`}
            content={`Are you sure you want to switch to account ${switchAccountName}?`}
            onClickSubmit={this.confirmSwitch}
            onClickCancel={this.toggleSwitchModal}
          />
        ) : null}

        {isShowForm ? (
          <AccountForm
            header={this.state.account && this.state.account._id ? 'Update Account' : 'Create Account'}
            account={this.state.account}
            updateAccount={this.updateAccount}
            onClose={this.toggleForm}
            onSubmit={this.onSubmit}
            isDisabled={isDisabled}
          />
        ) : null}
      </>
    );
  }
}

const mapStateToProps = ({ accounts, user }) => ({ accounts, activeAccountId: (user || {}).activeAccountId });

const mapDispatchToProps = { fetchAccounts, setAlert, setUser, newAccount, upsertAccount };

export default connect(mapStateToProps, mapDispatchToProps)(Accounts);
