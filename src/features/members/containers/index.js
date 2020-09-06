import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Header, Button, Label, Input, Segment, Grid } from 'semantic-ui-react';
import debounce from 'lodash/debounce';

import MemberForm from '../components/form';
import MemberCard from '../components/card';

import { createMember, updateMember } from '../api.js';

import { setAlert } from '../../alert/reducer';
import { newMember, upsertMember, setSearchText } from '../reducer';
import { newSaving } from '../../savings/reducer';

import { searchMembers, fetchAtiveLoanMembers } from '../../../helpers/members';

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

  onSubmit = async (e) => {
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

  navigateTo = (url) => this.props.history.push(url);

  handleSearchChange = (e, { value }) => this.props.setSearchText(value);

  render() {
    return (
      <>
        <Segment>
          <Grid rows={2}>
            <Grid.Column>
              <Grid.Row>
                <Header icon>Members</Header>

                <Button
                  style={{ marginLeft: '2em', marginRight: '2em' }}
                  as="a"
                  size="small"
                  secondary
                  onClick={this.toggleForm}
                  disabled={this.state.isDisabled}
                >
                  Add Member
                </Button>

                <Input
                  icon="search"
                  placeholder="Search..."
                  onChange={debounce(this.handleSearchChange, 500, {
                    leading: true
                  })}
                  value={this.props.searchText}
                />
              </Grid.Row>
            </Grid.Column>
          </Grid>
        </Segment>

        <Card.Group style={{ margin: '1em' }}>
          {this.props.memberIds.length ? (
            this.props.memberIds.map((m) => (
              <MemberCard key={m} memberId={m} toggleForm={this.toggleForm} navigateTo={this.navigateTo} />
            ))
          ) : (
            <Label style={{ margin: '2em' }}>
              No {this.props.isActiveLoans ? 'active loan members' : 'members'} found
            </Label>
          )}
        </Card.Group>

        {this.state.isShowForm ? (
          <MemberForm
            header={this.state.member && this.state.member._id ? 'Update Member' : 'Create Member'}
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

const mapStateToProps = ({ members, loans, searchText }, { isActiveLoans }) => {
  const filterdMembers = isActiveLoans ? fetchAtiveLoanMembers(members, loans) : members;
  return {
    memberIds: searchMembers(filterdMembers, searchText).map((m) => m._id),
    searchText
  };
};

const mapDispatchToProps = {
  setAlert,
  newMember,
  upsertMember,
  newSaving,
  setSearchText
};

export default connect(mapStateToProps, mapDispatchToProps)(Members);
