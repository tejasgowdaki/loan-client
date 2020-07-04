import React, { Component } from "react";
import { connect } from "react-redux";
import { Icon, Table, Button } from "semantic-ui-react";

import MemberForm from "./form";
import ConfirmModal from "../common/confirmModal";

import { createMember, updateMember, deleteMember } from "./api.js";

import { setAlert } from "../alert/reducer";
import { fetchMembers, newMember, upsertMember, removeMember } from "./reducer";

class Members extends Component {
  constructor(props) {
    super(props);
    this.state = {
      member: {},
      isShowForm: false,
      isDisabled: false,
      isShowDeleteModal: false,
      deleteMember: null
    };
  }

  componentDidMount = () => {
    this.props.fetchMembers();
  };

  toggleForm = (object = null) => {
    this.setState({
      member: object || {},
      isShowForm: !this.state.isShowForm
    });
  };

  updateMember = (key, value) =>
    this.setState({ member: { ...this.state.member, [key]: value } });

  validate = () => {
    if (!this.state.member.name) return false;
    if (!this.state.member.mobile) return false;
    if (this.state.member.mobile.length !== 10) return false;

    return true;
  };

  onSubmit = async e => {
    try {
      e.preventDefault();

      if (!this.validate()) return;

      this.setState({ isDisabled: true });

      if (this.state.member._id) {
        // update member
        const member = await updateMember(
          this.state.member._id,
          this.state.member
        );
        this.props.upsertMember(member);
        this.props.setAlert({
          type: "Success",
          message: `Successfully updated ${member.name}`
        });
      } else {
        // new member
        const member = await createMember(this.state.member);
        this.props.newMember(member);
        this.props.setAlert({
          type: "Success",
          message: `Successfully created ${member.name}`
        });
      }

      this.toggleForm();
      this.setState({ isDisabled: false });
    } catch (error) {
      this.props.setAlert({ type: "Error", message: error.message });
      this.setState({ isDisabled: false });
    }
  };

  promptDeleteModal = member => {
    this.setState({ isShowDeleteModal: true, deleteMember: member });
  };

  cancelDelete = () => {
    this.setState({ isShowDeleteModal: false, deleteMember: null });
  };

  confirmDelete = async () => {
    try {
      this.setState({ isDisabled: true });
      const memberId = await deleteMember(this.state.deleteMember._id);
      this.props.removeMember(memberId);
      this.props.setAlert({
        type: "Success",
        message: `Successfully deleted ${this.state.deleteMember.name}`
      });
      this.setState({
        isShowDeleteModal: false,
        deleteMember: null,
        isDisabled: false
      });
    } catch (error) {
      this.props.setAlert({ type: "Error", message: error.message });
      this.setState({ isDisabled: false });
    }
  };

  render() {
    return (
      <>
        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="3">
                Members
                <span textalign="right" style={{ paddingLeft: "2.5em " }}>
                  <Button
                    as="a"
                    size="mini"
                    secondary
                    onClick={() => this.toggleForm()}
                    disabled={this.state.isDisabled}
                  >
                    Add
                  </Button>
                </span>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.members.map(member => (
              <Table.Row key={member._id}>
                <Table.Cell collapsing>
                  <Icon name="user" /> {member.name}
                </Table.Cell>
                <Table.Cell>
                  <Icon name="mobile" />
                  {member.mobile}
                </Table.Cell>
                <Table.Cell textAlign="right">
                  <Icon
                    style={{ paddingRight: "2.5em " }}
                    name="pencil"
                    onClick={() => this.toggleForm(member)}
                    disabled={this.state.isDisabled}
                  />
                  <Icon
                    style={{ paddingRight: "2.5em ", color: "red" }}
                    name="trash"
                    onClick={() => this.promptDeleteModal(member)}
                    disabled={this.state.isDisabled}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

        {this.state.isShowForm ? (
          <MemberForm
            member={this.state.member}
            updateMember={this.updateMember}
            onClose={this.toggleForm}
            onSubmit={this.onSubmit}
            isDisabled={this.state.isDisabled}
          />
        ) : null}

        {this.state.isShowDeleteModal ? (
          <ConfirmModal
            header="Deleting member!!"
            content={`Are you sure you want to delete ${this.state.deleteMember.name}?`}
            onClickSubmit={this.confirmDelete}
            onClickCancel={this.cancelDelete}
          />
        ) : null}
      </>
    );
  }
}

const mapStateToProps = ({ members }, ownProps) => ({ members });

const mapDispatchToProps = {
  setAlert,
  fetchMembers,
  newMember,
  upsertMember,
  removeMember
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Members);
