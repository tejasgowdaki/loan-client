import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tab } from 'semantic-ui-react';

import ConfirmModal from '../../common/confirmModal';
import DepositList from '../../savings/components/depositList';
import DepositForm from '../../savings/components/depositForm';
import LoanForm from '../../loans/components/form';
import ShowCard from '../components/showCard';
import LoanList from '../../loans/components/loanList';

import { addDeposit, deleteDeposit } from '../../savings/api';
import { createLoan, updateLoan } from '../../loans/api';

import { setAlert } from '../../alert/reducer';
import { upsertSaving } from '../../savings/reducer';
import { newLoan, upsertLoan, removeLoan } from '../../loans/reducer';

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

  openLoanForm = (formLoan = null) => this.setState({ isShowLoanForm: true, formLoan });

  closeLoanForm = () => this.setState({ isShowLoanForm: false, formLoan: null });

  submitLoan = async (amount, date) => {
    try {
      this.setState({ isDisabled: true });

      if (this.state.formLoan) {
        // update
        const loan = await updateLoan(this.state.formLoan._id, { memberId: this.props.memberId, amount, date });
        this.props.upsertLoan(loan);
        this.props.setAlert({
          type: 'Success',
          message: `Successfully updated loan amount from ₹ ${this.state.formLoan.amount} to ₹ ${amount} for ${this.props.name}`
        });
      } else {
        // create
        const loan = await createLoan({ memberId: this.props.memberId, amount, date });
        this.props.newLoan(loan);
        this.props.setAlert({
          type: 'Success',
          message: `Successfully created new loan of ₹ ${amount} for ${this.props.name}`
        });
      }

      this.setState({ isDisabled: false, isShowLoanForm: false, formLoan: null });
    } catch (error) {
      this.props.setAlert({ type: 'Error', message: error.message });
      this.setState({ isDisabled: false });
    }
  };

  render() {
    const { name, mobile, totalSaving, deposits, loans, remainingLoanAmount } = this.props;
    const { isDisabled, isShowDeleteDepositModal, isShowDepositForm, isShowLoanForm } = this.state;

    const panes = [
      {
        menuItem: 'Loan',
        render: () => (
          <Tab.Pane>
            <LoanList loans={loans} />
          </Tab.Pane>
        )
      },
      {
        menuItem: 'Saving',
        render: () => (
          <Tab.Pane>
            <DepositList deposits={deposits} deleteDeposit={this.promptDepositDelete} isDisabled={isDisabled} />
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
          remainingLoanAmount={remainingLoanAmount}
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
            onClose={this.closeLoanForm}
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
  const inCompleteLoans = memberLoans.filter((l) => !l.isCompleted);
  const remainingLoanAmount = inCompleteLoans.reduce((sum, l) => (sum += l.amount - l.paidAmount), 0);

  return {
    memberId,
    name: member.name || 'N/A',
    mobile: member.mobile || 'N/A',
    totalSaving: saving.totalSaving || 0,
    savingId: saving._id || null,
    deposits: (saving.deposits || []).sort((t1, t2) => (new Date(t1.date) > new Date(t2.date) ? 1 : -1)),
    loans: memberLoans,
    remainingLoanAmount
  };
};

const mapDispatchToProps = {
  setAlert,
  upsertSaving,
  newLoan,
  upsertLoan,
  removeLoan
};

export default connect(mapStateToProps, mapDispatchToProps)(MemberShow);
