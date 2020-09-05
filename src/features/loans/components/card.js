import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Icon, Label, Accordion } from 'semantic-ui-react';
import moment from 'moment';

import ConfirmModal from '../../common/confirmModal';
import PaymentForm from './paymentForm';
import PaymentList from './paymentList';

import { addPayment, deletePayment, deleteLoan } from '../api';

import { setAlert } from '../../alert/reducer';
import { upsertLoan, removeLoan } from '../../loans/reducer';

class LoanCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: false,
      isShowDeleteLoanModal: false,
      isShowPaymentForm: false,
      isShowPayments: false,
      isShowDeletePaymentModal: false,
      deletePaymentId: null
    };
  }

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

  togglePayments = () => this.setState({ isShowPayments: !this.state.isShowPayments });

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
    const {
      index,
      memberName,
      loanDate,
      loanAmount,
      loanPaidAmount,
      loanPaidInterest,
      payments,
      isCompleted
    } = this.props;
    const {
      isDisabled,
      isShowDeleteLoanModal,
      isShowPaymentForm,
      isShowPayments,
      isShowDeletePaymentModal
    } = this.state;

    return (
      <>
        <Card fluid color="black">
          <Card.Content>
            <Card.Header>
              <Label>#{index + 1}</Label>

              <Button
                as="a"
                floated="right"
                size="mini"
                color="red"
                onClick={this.promptLoanDelete}
                disabled={isDisabled}
              >
                Delete Loan
              </Button>

              {isCompleted ? (
                <Button as="a" floated="right" size="mini" color="green">
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
                >
                  Pay Instalment
                </Button>
              )}
            </Card.Header>

            <Card.Header style={{ marginTop: '0.2em' }}>
              <Label style={{ marginTop: '0.25em' }}>Date: {loanDate}</Label>

              <Label style={{ marginTop: '0.25em' }}>
                Amount: <Icon name="rupee sign" />
                {loanAmount}
              </Label>

              <Label style={{ marginTop: '0.25em' }}>
                Paid: <Icon name="rupee sign" />
                {loanPaidAmount}
              </Label>

              <Label style={{ marginTop: '0.25em' }}>
                Pending amount: <Icon name="rupee sign" />
                {loanAmount - loanPaidAmount}
              </Label>

              <Label style={{ marginTop: '0.25em' }}>
                Interest: <Icon name="rupee sign" />
                {loanPaidInterest}
              </Label>
            </Card.Header>

            <Card.Description>
              <Accordion fluid styled>
                <Accordion.Title active={isShowPayments} onClick={this.togglePayments}>
                  <Icon name="dropdown" />
                  Payments
                </Accordion.Title>
              </Accordion>

              {isShowPayments ? (
                <PaymentList payments={payments} deletePayment={this.promptPaymentDelete} isDisabled={isDisabled} />
              ) : null}
            </Card.Description>
          </Card.Content>
        </Card>

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
    loanDate: loan.date ? moment(loan.date).format('DD MMMM YYYY') : 'N/A',
    loanAmount: loan.amount || '0',
    loanPaidAmount: loan.paidAmount || '0',
    loanPaidInterest: loan.paidInterest || '0',
    payments: (loan.payments || []).sort((t1, t2) => (new Date(t1.date) > new Date(t2.date) ? 1 : -1)),
    isCompleted: loan.isCompleted
  };
};

const mapDispatchToProps = {
  setAlert,
  upsertLoan,
  removeLoan
};

export default connect(mapStateToProps, mapDispatchToProps)(LoanCard);
