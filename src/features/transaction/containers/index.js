import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tab } from 'semantic-ui-react';

import ConfirmModal from '../../common/confirmModal';
import TransactionList from '../components/list';
import TransactionForm from '../components/form';

import { createTransaction, deleteTransaction } from '../api';

import { setAlert } from '../../alert/reducer';
import { newTransaction, removeTransaction } from '../reducer';

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: false,
      deleteTransactionId: null,
      isShowDeleteModal: false,
      isShowTransactionForm: false,
      type: null
    };
  }

  promptDeleteModal = (deleteTransactionId) => this.setState({ isShowDeleteModal: true, deleteTransactionId });

  closeDeleteModal = () => this.setState({ isShowDeleteModal: false, deleteTransactionId: null });

  confirmDelete = async (e) => {
    try {
      e.preventDefault();
      this.setState({ isDisabled: true });

      const transactionId = await deleteTransaction(this.state.deleteTransactionId);
      this.props.removeTransaction(transactionId);
      this.props.setAlert({ type: 'Success', message: 'Successfully deleted transaction' });

      this.setState({ isShowDeleteModal: false, deleteTransactionId: null, isDisabled: false });
    } catch (error) {
      this.props.setAlert({ type: 'Error', message: error.message });
      this.setState({ isDisabled: false });
    }
  };

  toggleForm = (type = null) =>
    this.setState({ isShowTransactionForm: !this.state.isShowTransactionForm, type, isDisabled: false });

  submitTransaction = async (amount, date, comment) => {
    try {
      if (!this.state.type) {
        this.props.setAlert({ type: 'Error', message: 'Transaction type not present. Please try again' });
        this.toggleForm();
        return;
      }

      this.setState({ isDisabled: true });

      const transaction = await createTransaction({ type: this.state.type, amount, date, comment });
      this.props.newTransaction(transaction);

      this.props.setAlert({
        type: 'Success',
        message: `Successfully create transaction of type: ${this.state.type} with ₹ ${amount}`
      });

      this.toggleForm();
    } catch (error) {
      this.props.setAlert({ type: 'Error', message: error.message });
      this.setState({ isDisabled: false });
    }
  };

  render() {
    const { incomeTransactions, expenseTransactions } = this.props;
    const { isDisabled, isShowDeleteModal, isShowTransactionForm } = this.state;

    const panes = [
      {
        menuItem: 'Income',
        render: () => (
          <Tab.Pane>
            <TransactionList
              type="income"
              transactions={incomeTransactions}
              deleteTransaction={this.promptDeleteModal}
              openForm={this.toggleForm}
            />
          </Tab.Pane>
        )
      },
      {
        menuItem: 'Expense',
        render: () => (
          <Tab.Pane>
            <TransactionList
              type="expense"
              transactions={expenseTransactions}
              deleteTransaction={this.promptDeleteModal}
              openForm={this.toggleForm}
            />
          </Tab.Pane>
        )
      }
    ];

    return (
      <>
        <div style={{ margin: '1em' }}>
          <Tab panes={panes} />
        </div>

        {isShowDeleteModal ? (
          <ConfirmModal
            header="Deleting transaction!!"
            content={`Are you sure you want to delete this transaction?`}
            onClickSubmit={this.confirmDelete}
            onClickCancel={this.closeDeleteModal}
          />
        ) : null}

        {isShowTransactionForm ? (
          <TransactionForm
            type={this.state.type}
            onClose={this.toggleForm}
            onSubmit={this.submitTransaction}
            isDisabled={isDisabled}
          />
        ) : null}
      </>
    );
  }
}

const mapStateToProps = ({ transactions }) => {
  return {
    incomeTransactions: transactions.filter((t) => t.type === 'income'),
    expenseTransactions: transactions.filter((t) => t.type === 'expense')
  };
};

const mapDispatchToProps = {
  setAlert,
  newTransaction,
  removeTransaction
};

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
