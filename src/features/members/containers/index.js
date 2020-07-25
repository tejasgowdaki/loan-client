import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Header, Segment, Button } from 'semantic-ui-react';

import MemberForm from '../components/form';
import MemberCard from '../components/card';

import { createMember, updateMember } from '../api.js';

import { setAlert } from '../../alert/reducer';
import { newMember, upsertMember } from '../reducer';
import { newSaving } from '../../savings/reducer';

class Members extends Component {
  constructor(props) {
    super(props);
    this.state = {
      member: {},
      isShowForm: false,
      isDisabled: false
    };
  }

  toggleForm = (object = null) => this.setState({ member: object || {}, isShowForm: !this.state.isShowForm });

  updateMember = (key, value) => this.setState({ member: { ...this.state.member, [key]: value } });

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
        const member = await updateMember(this.state.member._id, this.state.member);
        this.props.upsertMember(member);
        this.props.setAlert({
          type: 'Success',
          message: `Successfully updated ${member.name}`
        });
      } else {
        // new member
        const { member, saving } = await createMember(this.state.member);
        this.props.newMember(member);
        this.props.newSaving(saving);
        this.props.setAlert({
          type: 'Success',
          message: `Successfully created ${member.name}`
        });
      }

      this.toggleForm();
      this.setState({ isDisabled: false });
    } catch (error) {
      this.props.setAlert({ type: 'Error', message: error.message });
      this.setState({ isDisabled: false });
    }
  };

  navigateTo = url => this.props.history.push(url);

  render() {
    return (
      <>
        <Segment clearing>
          <Header as="h3" floated="left">
            Members
          </Header>
          <Header as="h3" floated="right">
            <Button as="a" size="mini" secondary onClick={this.toggleForm} disabled={this.state.isDisabled}>
              Add
            </Button>
          </Header>
        </Segment>

        <Card.Group>
          {this.props.memberIds.map(m => (
            <MemberCard key={m} memberId={m} toggleForm={this.toggleForm} navigateTo={this.navigateTo} />
          ))}
        </Card.Group>

        {this.state.isShowForm ? (
          <MemberForm
            member={this.state.member}
            updateMember={this.updateMember}
            onClose={this.toggleForm}
            onSubmit={this.onSubmit}
            isDisabled={this.state.isDisabled}
          />
        ) : null}
      </>
    );
  }
}

const mapStateToProps = ({ members }) => ({
  memberIds: members.map(m => m._id)
});

const mapDispatchToProps = {
  setAlert,
  newMember,
  upsertMember,
  newSaving
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Members);
