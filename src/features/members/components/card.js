import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Icon, Grid, Label } from 'semantic-ui-react';

// import ConfirmModal from '../../common/confirmModal';
import DepositForm from '../../savings/components/depositForm';

// import { deleteMember } from '../api';
import { addDeposit } from '../../savings/api';

import { setAlert } from '../../alert/reducer';
import { removeMember } from '../reducer';
import { upsertSaving } from '../../savings/reducer';

import { formatAmount } from '../../../helpers/utils';

import { AccountTypeContext } from '../../../context';

class MemberCard extends PureComponent {
  static contextType = AccountTypeContext;
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: false,
      isShowDeleteModal: false,
      isShowDepositForm: false
    };
  }

  toggleDepositForm = () => this.setState({ isShowDepositForm: !this.state.isShowDepositForm });

  submitDeposit = async (amount, date) => {
    try {
      if (!this.props.savingId) {
        this.props.setAlert({
          type: 'Error',
          message: `Record not found for ${this.props.name}`
        });
        this.toggleDepositForm();
        return;
      }

      this.setState({ isDisabled: true });
      const saving = await addDeposit(this.props.savingId, { memberId: this.props.memberId, amount, date });
      this.props.upsertSaving(saving);
      this.props.setAlert({
        type: 'Success',
        message: `Successfully deposited ₹ ${amount} for ${this.props.name}`
      });
      this.setState({ isDisabled: false, isShowDepositForm: false });
    } catch (error) {
      this.props.setAlert({ type: 'Error', message: error.message });
      this.setState({ isDisabled: false });
    }
  };

  showMember = () => this.props.navigateTo(`/members/${this.props.memberId}`);

  render() {
    const { memberId, name, mobile, totalSaving, toggleForm, remainingLoanAmount, instalmentCount } = this.props;
    const { isDisabled, isShowDepositForm } = this.state;

    return (
      <Card style={{ width: 'auto' }}>
        <Card.Content>
          <Card.Header>{name}</Card.Header>

          <Card.Description>
            <Grid rows={2}>
              <Grid.Column>
                <Grid.Row>
                  <Label style={{ margin: '0.25em' }}>
                    <Icon name="mobile alternate" /> {mobile}
                  </Label>

                  <Label style={{ margin: '0.25em' }}>
                    {this.context ? 'Savings' : 'Total amount received'}: <Icon name="rupee sign" />
                    {formatAmount(totalSaving)}
                  </Label>

                  {this.context ? (
                    <Label style={{ margin: '0.25em' }}>
                      Remaining loan amount: <Icon name="rupee sign" />
                      {formatAmount(remainingLoanAmount)}
                    </Label>
                  ) : (
                    <Label style={{ margin: '0.25em' }}>
                      No. instalments Paid:
                      {instalmentCount}
                    </Label>
                  )}
                </Grid.Row>
              </Grid.Column>
            </Grid>
          </Card.Description>
        </Card.Content>

        <Card.Content extra>
          <Button
            as="a"
            style={{ margin: '0.3em' }}
            size="small"
            color="blue"
            onClick={this.showMember}
            disabled={isDisabled}
          >
            Show
          </Button>

          <Button
            as="a"
            style={{ margin: '0.3em' }}
            secondary
            size="small"
            onClick={() => toggleForm({ _id: memberId, name, mobile })}
            disabled={isDisabled}
          >
            Edit
          </Button>

          {/* <Button
            as="a"
            style={{ margin: '0.3em' }}
            size="small"
            color="red"
            onClick={this.toggleDeleteModal}
            disabled={isDisabled}
          >
            Delete
          </Button> */}

          <Button
            as="a"
            style={{ margin: '0.3em' }}
            size="small"
            color="green"
            disabled={isDisabled}
            onClick={this.toggleDepositForm}
          >
            Add {this.context ? 'Saving' : 'Payment'}
          </Button>
        </Card.Content>

        {/* {isShowDeleteModal ? (
          <ConfirmModal
            header="Deleting member!!"
            content={`Are you sure you want to delete ${name}?`}
            onClickSubmit={this.confirmDelete}
            onClickCancel={this.toggleDeleteModal}
          />
        ) : null} */}

        {isShowDepositForm ? (
          <DepositForm
            title={`Add new ${this.context ? 'saving' : 'payment'} to ${name}`}
            name={this.props.name}
            onClose={this.toggleDepositForm}
            onSubmit={this.submitDeposit}
            isDisabled={isDisabled}
          />
        ) : null}
      </Card>
    );
  }
}

const mapStateToProps = ({ members, savings, loans }, { memberId }) => {
  const member = members.find((m) => m._id === memberId) || {};
  const saving = savings.find((s) => s.memberId === memberId) || {};
  const inCompleteLoans = loans.filter((l) => !l.isCompleted && l.memberId === memberId);
  const remainingLoanAmount = inCompleteLoans.reduce((sum, l) => (sum += l.amount - l.paidAmount), 0);

  return {
    name: member.name || 'N/A',
    mobile: member.mobile || 'N/A',
    totalSaving: saving.totalSaving || 0,
    remainingLoanAmount: remainingLoanAmount || 0,
    savingId: saving._id || null,
    instalmentCount: (saving.deposits || []).length
  };
};

const mapDispatchToProps = {
  setAlert,
  removeMember,
  upsertSaving
};

export default connect(mapStateToProps, mapDispatchToProps)(MemberCard);

// toggleDeleteModal = () => this.setState({ isShowDeleteModal: !this.state.isShowDeleteModal });

// confirmDelete = async (e) => {
//   try {
//     e.preventDefault();
//     this.setState({ isDisabled: true });

//     await deleteMember(this.props.memberId);
//     this.props.setAlert({ type: 'Success', message: `Successfully deleted ${this.props.name}` });
//     this.props.removeMember(this.props.memberId);

//     this.setState({ isShowDeleteModal: false, isDisabled: false });
//   } catch (error) {
//     this.props.setAlert({ type: 'Error', message: error.message });
//     this.setState({ isDisabled: false });
//   }
// };
