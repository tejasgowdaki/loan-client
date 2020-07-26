import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setAlert } from '../../alert/reducer';

class Loans extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: false
    };
  }

  render() {
    return <span>Coming soon...</span>;
  }
}

const mapStateToProps = ({ loans }) => ({
  loans
});

const mapDispatchToProps = {
  setAlert
};

export default connect(mapStateToProps, mapDispatchToProps)(Loans);
