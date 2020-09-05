import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Header } from 'semantic-ui-react';
import moment from 'moment';

import ConfirmModal from '../../common/confirmModal';
import PaymentForm from './paymentForm';
import PaymentTable from './paymantTable';
import FormModal from '../../common/formModal';

import { addPayment, deletePayment, deleteLoan } from '../api';

import { setAlert } from '../../alert/reducer';
import { upsertLoan, removeLoan } from '../../loans/reducer';

class LoanRow extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: false,
      isShowDetails: false,
      isShowDeleteLoanModal: false,
      isShowPaymentForm: false,

      isShowDeletePaymentModal: false,
      deletePaymentId: null
    };
  }

  toggleDetails = () => this.setState({ isShowDetails: !this.state.isShowDetails });

  promptLoanDelete = () => this.setState({ isShowDeleteLoanModal: true });

  closeDeleteLoanModal = () => this.setState({ isShowDeleteLoanModal: false });

  confirmDeleteLoan = async (e) => {
    try {
      e.preventDefault();
      this.setState({ isDisabled: true });

      const loanId = await deleteLoan(this.props.loanId);
      this.props.removeLoan(loanId);
      this.props.setAlert({ type: 'Success', message: 'Successfully deleted loan' });

      this.setState({ isShowDeleteLoanModal: false, isDisabled: false });
    } catch (error) {
      this.props.setAlert({ type: 'Error', message: error.message });
      this.setState({ isDisabled: false });
    }
  };

  togglePaymentForm = () => this.setState({ isShowPaymentForm: !this.state.isShowPaymentForm });

  submitPayment = async (amount, interest, date) => {
    try {
      this.setState({ isDisabled: true });

      const loan = await addPayment(this.props.loanId, { amount, interest, date });
      this.props.upsertLoan(loan);
      this.props.setAlert({ type: 'Success', message: `Successfully added loan payment for ${this.props.memberName}` });

      this.setState({ isShowPaymentForm: false, isDisabled: false });
    } catch (error) {
      this.props.setAlert({ type: 'Error', message: error.message });
      this.setState({ isDisabled: false });
    }
  };

  promptPaymentDelete = (deletePaymentId) => this.setState({ isShowDeletePaymentModal: true, deletePaymentId });

  closeDeletePaymentModal = () => this.setState({ isShowDeletePaymentModal: false, deletePaymentId: null });

  confirmDeletePayment = async (e) => {
    try {
      e.preventDefault();
      this.setState({ isDisabled: true });

      const loan = await deletePayment(this.props.loanId, { paymentId: this.state.deletePaymentId });
      this.props.upsertLoan(loan);
      this.props.setAlert({
        type: 'Success',
        message: `Successfully removed loan payment of ${this.props.memberName}`
      });

      this.setState({ isShowDeletePaymentModal: false, isDisabled: false });
    } catch (error) {
      this.props.setAlert({ type: 'Error', message: error.message });
      this.setState({ isDisabled: false });
    }
  };

  render() {
    const { slNumber, memberName, date, amount, paidAmount, paidInterest, payments = [], isCompleted } = this.props;

    const {
      isDisabled,
      isShowDetails,
      isShowDeleteLoanModal,
      isShowPaymentForm,
      isShowDeletePaymentModal
    } = this.state;

    return (
      <>
        <Table.Body>
          <Table.Row textAlign="left">
            <Table.Cell rowSpan="2">{slNumber}</Table.Cell>
            <Table.Cell>{date}</Table.Cell>
            <Table.Cell>{amount}</Table.Cell>
            <Table.Cell>{paidAmount}</Table.Cell>
            <Table.Cell>{amount - paidAmount}</Table.Cell>
            <Table.Cell>{paidInterest}</Table.Cell>
          </Table.Row>

          <Table.Row textAlign="left">
            <Table.Cell colSpan="5">
              <Button
                as="a"
                floated="right"
                size="mini"
                color="red"
                onClick={this.promptLoanDelete}
                disabled={isDisabled}
                style={{ marginTop: '0.1em' }}
              >
                Delete Loan
              </Button>

              {isCompleted ? (
                <Button as="a" floated="right" size="mini" color="green" style={{ marginTop: '0.1em' }}>
                  Completed
                </Button>
              ) : (
                <Button
                  as="a"
                  floated="right"
                  size="mini"
                  color="blue"
                  onClick={this.togglePaymentForm}
                  disabled={isDisabled}
                  style={{ marginTop: '0.1em' }}
                >
                  Pay Instalment
                </Button>
              )}

              <Button
                as="a"
                floated="right"
                size="mini"
                color="green"
                // onClick={this.promptLoanDelete}
                style={{ marginTop: '0.1em' }}
                disabled={isDisabled}
              >
                Additional Loan
              </Button>

              <Button
                as="a"
                floated="right"
                size="mini"
                color="black"
                onClick={this.toggleDetails}
                disabled={isDisabled}
                style={{ marginTop: '0.1em' }}
              >
                Details
              </Button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>

        {isShowDetails ? (
          <FormModal header="Loan details" closeLabel="Close" onClose={this.toggleDetails}>
            <Header as="h4">Payments</Header>
            <PaymentTable payments={payments} deletePayment={this.promptPaymentDelete} isDisabled={isDisabled} />
          </FormModal>
        ) : null}

        {isShowDeleteLoanModal ? (
          <ConfirmModal
            header="Deleting loan!!"
            content={`Are you sure you want to delete this loan?`}
            onClickSubmit={this.confirmDeleteLoan}
            onClickCancel={this.closeDeleteLoanModal}
          />
        ) : null}

        {isShowPaymentForm ? (
          <PaymentForm
            name={memberName}
            isDisabled={isDisabled}
            onClose={this.togglePaymentForm}
            onSubmit={this.submitPayment}
          />
        ) : null}

        {isShowDeletePaymentModal ? (
          <ConfirmModal
            header="Deleting loan payment!!"
            content={`Are you sure you want to delete this loan payment?`}
            onClickSubmit={this.confirmDeletePayment}
            onClickCancel={this.closeDeletePaymentModal}
          />
        ) : null}
      </>
    );
  }
}

const mapStateToProps = ({ members, loans }, { loanId }) => {
  const loan = loans.find(({ _id }) => _id === loanId) || {};
  const member = members.find((m) => m._id === loan.memberId) || {};

  return {
    memberName: member.name || 'N/A',
    date: loan.date ? moment(loan.date).format('D MMM YYYY') : 'N/A',
    amount: loan.amount || 0,
    paidAmount: loan.paidAmount || 0,
    paidInterest: loan.paidInterest || 0,
    payments: (loan.payments || []).sort((t1, t2) => (new Date(t1.date) > new Date(t2.date) ? 1 : -1)),
    isCompleted: loan.isCompleted
  };
};

const mapDispatchToProps = {
  setAlert,
  upsertLoan,
  removeLoan
};

export default connect(mapStateToProps, mapDispatchToProps)(LoanRow);
