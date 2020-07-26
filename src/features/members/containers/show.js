import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Icon, Tab, Button, Header } from 'semantic-ui-react';

import ConfirmModal from '../../common/confirmModal';
import DepositList from '../../savings/components/depositList';
import DepositForm from '../../savings/components/depositForm';

import { addDeposit, deleteDeposit } from '../../savings/api';

import { setAlert } from '../../alert/reducer';
import { upsertSaving } from '../../savings/reducer';

class MemberShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: false,
      isShowDeleteDepositModal: false,
      deleteDepositId: null,
      isShowDepositForm: false
    };
  }

  promptDepositDelete = deleteDepositId => this.setState({ isShowDeleteDepositModal: true, deleteDepositId });

  closeDeleteDepositModal = () => this.setState({ isShowDeleteDepositModal: false, deleteDepositId: null });

  confirmDeleteDeposit = async e => {
    try {
      e.preventDefault();
      this.setState({ isDisabled: true });

      const saving = await deleteDeposit(this.props.savingId, { depositId: this.state.deleteDepositId });
      this.props.upsertSaving(saving);
      this.props.setAlert({ type: 'Success', message: 'Successfully deleted deposit' });

      this.setState({ isShowDeleteDepositModal: false, deleteDepositId: null, isDisabled: false });
    } catch (error) {
      this.props.setAlert({ type: 'Error', message: error.message });
      this.setState({ isDisabled: false });
    }
  };

  toggleDepositForm = () => this.setState({ isShowDepositForm: !this.state.isShowDepositForm });

  submitDeposit = async (amount, date) => {
    try {
      if (!this.props.savingId) {
        this.props.setAlert({ type: 'Error', message: `Saving not found for ${this.props.name}` });
        this.toggleDepositForm();
        return;
      }

      this.setState({ isDisabled: true });
      const saving = await addDeposit(this.props.savingId, { memberId: this.props.memberId, amount, date });
      this.props.upsertSaving(saving);
      this.props.setAlert({ type: 'Success', message: `Successfully deposited Rs. ${amount} for ${this.props.name}` });
      this.setState({ isDisabled: false, isShowDepositForm: false });
    } catch (error) {
      this.props.setAlert({ type: 'Error', message: error.message });
      this.setState({ isDisabled: false });
    }
  };

  render() {
    const { name, mobile, totalSaving, deposits } = this.props;

    const panes = [
      {
        menuItem: 'Saving',
        render: () => (
          <Tab.Pane>
            <DepositList
              deposits={deposits}
              deleteDeposit={this.promptDepositDelete}
              isDisabled={this.state.isDisabled}
            />
          </Tab.Pane>
        )
      },
      {
        menuItem: 'Loan',
        render: () => (
          <Tab.Pane>
            <div>Coming soon...</div>
          </Tab.Pane>
        )
      }
    ];

    return (
      <>
        <div style={{ marginDown: '5em' }}>
          <Card.Group>
            <Card style={{ marginTop: '2em', marginLeft: '1.5em', width: 'auto' }}>
              <Card.Content>
                <Header>Member Details</Header>

                <Card.Header>{name}</Card.Header>

                <Card.Description>
                  <span style={{ paddingRight: '3em ' }}>
                    <Icon name="mobile alternate" /> {mobile}
                  </span>

                  <span style={{ paddingRight: '3em ' }}>Savings: Rs. {totalSaving}</span>
                </Card.Description>
              </Card.Content>

              <Card.Content extra>
                <Button size="small" color="green" disabled={this.state.isDisabled} onClick={this.toggleDepositForm}>
                  Add Deposit
                </Button>
              </Card.Content>
            </Card>
          </Card.Group>
        </div>

        <div style={{ margin: '1em' }}>
          <Tab panes={panes} />
        </div>

        {this.state.isShowDeleteDepositModal ? (
          <ConfirmModal
            header="Deleting deposit!!"
            content={`Are you sure you want to delete this deposit?`}
            onClickSubmit={this.confirmDeleteDeposit}
            onClickCancel={this.closeDeleteDepositModal}
          />
        ) : null}

        {this.state.isShowDepositForm ? (
          <DepositForm
            name={this.props.name}
            onClose={this.toggleDepositForm}
            onSubmit={this.submitDeposit}
            isDisabled={this.state.isDisabled}
          />
        ) : null}
      </>
    );
  }
}

const mapStateToProps = ({ members, savings }, ownProps) => {
  const { memberId } = ownProps.match.params;
  const member = members.find(m => m._id === memberId) || {};
  const saving = savings.find(s => s.memberId === memberId) || {};

  return {
    memberId,
    name: member.name || 'N/A',
    mobile: member.mobile || 'N/A',
    totalSaving: saving.totalSaving || 0,
    savingId: saving._id || null,
    deposits: (saving.deposits || []).sort((t1, t2) => (new Date(t1.date) > new Date(t2.date) ? 1 : -1))
  };
};

const mapDispatchToProps = {
  setAlert,
  upsertSaving
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberShow);
