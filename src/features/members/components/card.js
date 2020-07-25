import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Icon } from 'semantic-ui-react';

import ConfirmModal from '../../common/confirmModal';
import DepositForm from '../../savings/components/depositForm';

import { deleteMember } from '../api';
import { addDeposit } from '../../savings/api';

import { setAlert } from '../../alert/reducer';
import { removeMember } from '../reducer';
import { upsertSaving } from '../../savings/reducer';

class MemberCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: false,
      isShowDeleteModal: false,
      isShowDepositForm: false
    };
  }

  toggleDeleteModal = () => {
    this.setState({ isShowDeleteModal: !this.state.isShowDeleteModal });
  };

  confirmDelete = async e => {
    try {
      e.preventDefault();
      this.setState({ isDisabled: true });

      await deleteMember(this.props.memberId);
      this.props.setAlert({ type: 'Success', message: `Successfully deleted ${this.props.name}` });
      this.props.removeMember(this.props.memberId);

      this.setState({ isShowDeleteModal: false, isDisabled: false });
    } catch (error) {
      this.props.setAlert({ type: 'Error', message: error.message });
      this.setState({ isDisabled: false });
    }
  };

  toggleDepositForm = () => {
    this.setState({ isShowDepositForm: !this.state.isShowDepositForm });
  };

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
    const { memberId, name, mobile, totalSaving, toggleForm } = this.props;
    const { isDisabled, isShowDeleteModal, isShowDepositForm } = this.state;

    return (
      <>
        <Card style={{ marginTop: '2em', marginDown: '1em', marginLeft: '2em', marginRight: '2em', minWidth: 370 }}>
          <Card.Content>
            <Card.Header>{name}</Card.Header>

            <Card.Description>
              <span style={{ paddingRight: '3em ' }}>
                <Icon name="mobile" /> {mobile}
              </span>

              <span style={{ paddingRight: '3em ' }}>Savings: Rs. {totalSaving}</span>
            </Card.Description>
          </Card.Content>

          <Card.Content extra>
            <Button
              style={{ marginRight: '1em ' }}
              size="small"
              color="green"
              disabled={isDisabled}
              onClick={this.toggleDepositForm}
            >
              Add Deposit
            </Button>

            <Button
              style={{ marginRight: '1em ' }}
              secondary
              size="small"
              onClick={() => toggleForm({ _id: memberId, name, mobile })}
              disabled={isDisabled}
            >
              Edit
            </Button>

            <Button
              style={{ marginRight: '1em ' }}
              size="small"
              color="red"
              onClick={this.toggleDeleteModal}
              disabled={isDisabled}
            >
              Delete
            </Button>
          </Card.Content>
        </Card>

        {isShowDeleteModal ? (
          <ConfirmModal
            header="Deleting member!!"
            content={`Are you sure you want to delete ${name}?`}
            onClickSubmit={this.confirmDelete}
            onClickCancel={this.toggleDeleteModal}
          />
        ) : null}

        {isShowDepositForm ? (
          <DepositForm
            name={this.props.name}
            onClose={this.toggleDepositForm}
            onSubmit={this.submitDeposit}
            isDisabled={isDisabled}
          />
        ) : null}
      </>
    );
  }
}

const mapStateToProps = ({ members, savings }, { memberId }) => {
  const member = members.find(m => m._id === memberId) || {};
  const saving = savings.find(s => s.memberId === memberId) || {};

  return {
    name: member.name || 'N/A',
    mobile: member.mobile || 'N/A',
    totalSaving: saving.totalSaving || 0,
    savingId: saving._id || null
  };
};

const mapDispatchToProps = {
  setAlert,
  removeMember,
  upsertSaving
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberCard);
