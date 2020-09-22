import React, { Component } from 'react';
import { connect } from 'react-redux';

import ConfirmModal from '../../common/confirmModal';
import ChitForm from '../components/form';
import ChitCard from '../components/card';
import ChitTable from '../components/table';

import { createChit, deleteChit } from '../api';

import { setAlert } from '../../alert/reducer';
import { newChit, removeChit } from '../reducer';

import { constructStats } from '../../../helpers/chit';

import { AccountTypeContext } from '../../../context';

class Chits extends Component {
  static contextType = AccountTypeContext;
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: false,
      isShowDeleteModal: false,
      deleteChitId: null,
      isShowForm: false
    };
  }

  toggleDeleteModal = (deleteChitId = null) =>
    this.setState({ isShowDeleteModal: !this.state.isShowDeleteModal, deleteChitId });

  confirmDelete = async (e) => {
    try {
      e.preventDefault();
      this.setState({ isDisabled: true });

      const chitId = await deleteChit(this.state.deleteChitId);
      this.props.removeChit(chitId);
      this.props.setAlert({ type: 'Success', message: 'Successfully deleted chit' });

      this.setState({ isShowDeleteModal: false, deleteChitId: null, isDisabled: false });
    } catch (error) {
      this.props.setAlert({ type: 'Error', message: error.message });
      this.setState({ isDisabled: false });
    }
  };

  toggleForm = () => this.setState({ isShowForm: !this.state.isShowForm });

  submitChit = async (amount, date, receiver, memberId) => {
    try {
      this.setState({ isDisabled: true });

      // create
      const chit = await createChit({ amount, date, receiver, memberId });
      this.props.newChit(chit);
      this.props.setAlert({
        type: 'Success',
        message: `Successfully created new chit of ₹ ${amount}`
      });

      this.setState({ isDisabled: false, isShowForm: false });
    } catch (error) {
      this.props.setAlert({ type: 'Error', message: error.message });
      this.setState({ isDisabled: false });
    }
  };

  render() {
    const { chits, memberOptions, stats } = this.props;
    const { isDisabled, deleteChitId, isShowForm } = this.state;

    return (
      <>
        <ChitCard toggleForm={this.toggleForm} {...stats} />

        <ChitTable chits={chits} toggleDeleteModal={this.toggleDeleteModal} isDisabled={isDisabled} />

        {deleteChitId ? (
          <ConfirmModal
            header="Deleting chit!!`"
            content="Are you sure you want to delete this chit?"
            onClickSubmit={this.confirmDelete}
            onClickCancel={this.toggleDeleteModal}
          />
        ) : null}

        {isShowForm ? (
          <ChitForm
            onClose={this.toggleForm}
            onSubmit={this.submitChit}
            isDisabled={isDisabled}
            memberOptions={memberOptions}
          />
        ) : null}
      </>
    );
  }
}

const mapStateToProps = ({ chits, members, savings }) => {
  const stats = constructStats(chits, savings);
  return {
    chits,
    memberOptions: members.map((m) => ({ key: m._id, text: m.name, value: m._id })),
    stats
  };
};

const mapDispatchToProps = {
  setAlert,
  newChit,
  removeChit
};

export default connect(mapStateToProps, mapDispatchToProps)(Chits);
