import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tab } from 'semantic-ui-react';

import ConfirmModal from '../../common/confirmModal';
import DepositList from '../../savings/components/depositList';
import DepositForm from '../../savings/components/depositForm';
import LoanForm from '../../loans/components/form';
import ShowCard from '../components/showCard';

import { addDeposit, deleteDeposit } from '../../savings/api';
import { createLoan, updateLoan } from '../../loans/api';

import { setAlert } from '../../alert/reducer';
import { upsertSaving } from '../../savings/reducer';
import { newLoan, upsertLoan } from '../../loans/reducer';

class MemberShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: false,
      isShowDeleteDepositModal: false,
      deleteDepositId: null,
      isShowDepositForm: false,
      isShowLoanForm: false,
      formLoan: null
    };
  }

  promptDepositDelete = (deleteDepositId) => this.setState({ isShowDeleteDepositModal: true, deleteDepositId });

  closeDeleteDepositModal = () => this.setState({ isShowDeleteDepositModal: false, deleteDepositId: null });

  confirmDeleteDeposit = async (e) => {
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

  openLoanForm = (formLoan = null) => {
    console.log('MemberShow -> openLoanForm -> formLoan', formLoan);
    this.setState({ isShowLoanForm: !this.state.isShowLoanForm, formLoan });
  };

  submitLoan = async (amount) => {
    try {
      console.log('MemberShow -> submitLoan -> amount', amount);

      this.setState({ isDisabled: true });

      if (this.state.formLoan) {
        // update
        const loan = await updateLoan(this.state.formLoan._id, { memberId: this.props.memberId, amount });
        this.props.upsertLoan(loan);
        this.props.setAlert({
          type: 'Success',
          message: `Successfully udpated loan amount from Rs. ${this.state.formLoan.amount} to Rs. ${amount} for ${this.props.name}`
        });
      } else {
        // create
        const loan = await createLoan({ memberId: this.props.memberId, amount });
        this.props.newLoan(loan);
        this.props.setAlert({
          type: 'Success',
          message: `Successfully created new loan of Rs. ${amount} for ${this.props.name}`
        });
      }

      this.setState({ isDisabled: false, isShowLoanForm: false, formLoan: null });
    } catch (error) {
      this.props.setAlert({ type: 'Error', message: error.message });
      this.setState({ isDisabled: false });
    }
  };

  render() {
    const { name, mobile, totalSaving, deposits } = this.props;
    const { isDisabled, formLoan, isShowDeleteDepositModal, isShowDepositForm, isShowLoanForm } = this.state;
    console.log('MemberShow -> render -> formLoan', formLoan);

    const panes = [
      {
        menuItem: 'Saving',
        render: () => (
          <Tab.Pane>
            <DepositList deposits={deposits} deleteDeposit={this.promptDepositDelete} isDisabled={isDisabled} />
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
        <ShowCard
          name={name}
          mobile={mobile}
          totalSaving={totalSaving}
          toggleDepositForm={this.toggleDepositForm}
          openLoanForm={this.openLoanForm}
          isDisabled={isDisabled}
        />

        <div style={{ margin: '1em' }}>
          <Tab panes={panes} />
        </div>

        {isShowDeleteDepositModal ? (
          <ConfirmModal
            header="Deleting deposit!!"
            content={`Are you sure you want to delete this deposit?`}
            onClickSubmit={this.confirmDeleteDeposit}
            onClickCancel={this.closeDeleteDepositModal}
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

        {isShowLoanForm ? (
          <LoanForm
            name={this.props.name}
            onClose={this.toggleLoanForm}
            onSubmit={this.submitLoan}
            isDisabled={isDisabled}
          />
        ) : null}
      </>
    );
  }
}

const mapStateToProps = ({ members, savings, loans }, ownProps) => {
  const { memberId } = ownProps.match.params;
  const member = members.find((m) => m._id === memberId) || {};
  const saving = savings.find((s) => s.memberId === memberId) || {};
  const memberLoans = loans.filter((l) => l.memberId === memberId);

  return {
    memberId,
    name: member.name || 'N/A',
    mobile: member.mobile || 'N/A',
    totalSaving: saving.totalSaving || 0,
    savingId: saving._id || null,
    deposits: (saving.deposits || []).sort((t1, t2) => (new Date(t1.date) > new Date(t2.date) ? 1 : -1)),
    loans: memberLoans
  };
};

const mapDispatchToProps = {
  setAlert,
  upsertSaving,
  newLoan,
  upsertLoan
};

export default connect(mapStateToProps, mapDispatchToProps)(MemberShow);
