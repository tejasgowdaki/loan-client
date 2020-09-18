import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Header, Button, Grid } from 'semantic-ui-react';

import MemberForm from '../../members/components/form';
import LoginForm from '../components/loginForm';

import { requestLoginOTP, login, signup } from '../api';

import { setAlert } from '../../alert/reducer';
import { setUser } from '../../account/reducer';

import { fetchDateFromToken } from '../../../helpers/auth';

class LandingPage extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      account: {},
      isShowSignUpForm: false,
      loginMobile: null,
      loginMobileErrorMessage: '',
      loginOTP: null,
      loginOtpErrorMessage: '',
      isShowLoginForm: false,
      isShowOTP: false,
      isDisabled: false
    };
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  toggleSignUpForm = () => this.setState({ account: {}, isShowSignUpForm: !this.state.isShowSignUpForm });

  updateAccount = (key, value) => this.setState({ account: { ...this.state.account, [key]: value } });

  validateSignUp = () => {
    if (!this.state.account.name) return false;
    if (!this.state.account.mobile) return false;
    if (this.state.account.mobile.length !== 10) return false;

    return true;
  };

  onSubmitSignUp = async (e) => {
    try {
      e.preventDefault();

      if (!this.validateSignUp()) return;

      this.setState({ isDisabled: true });

      // new account
      const account = await signup(this.state.account);

      this.props.setAlert({
        type: 'Success',
        message: `Successfully created ${account.name} account. Please login now to start using the app now`
      });

      this.toggleSignUpForm();
      this.setState({ isDisabled: false });
    } catch (error) {
      this.props.setAlert({ type: 'Error', message: error.message });
      this.setState({ isDisabled: false });
    }
  };

  toggleLoginForm = () =>
    this.setState({
      loginMobile: null,
      loginOTP: null,
      isShowOTP: false,
      isShowLoginForm: !this.state.isShowLoginForm
    });

  updateLoginMobile = (loginMobile) => {
    if (loginMobile.length > 10) return;
    this.setState({ loginMobile }, () => this.validateLoginMobile());
  };

  updateLoginOTP = (loginOTP) => {
    const loginOtpErrorMessage = !loginOTP ? 'OTP is required' : '';
    this.setState({ loginOTP, loginOtpErrorMessage });
  };

  validateLoginMobile = () => {
    let valid = true,
      message = '';
    if (!this.state.loginMobile) {
      valid = false;
      message = 'Mobile number is required';
    } else if (this.state.loginMobile.length !== 10) {
      valid = false;
      message = 'Mobile number should be 10 digits';
    }

    this.setState({ loginMobileErrorMessage: message });

    return valid;
  };

  validateLoginOTP = () => {
    if (!this.state.loginOTP) return false;

    return true;
  };

  onSubmitLogin = async (e) => {
    try {
      e.preventDefault();

      if (this.state.isShowOTP) {
        if (!this.validateLoginOTP()) {
          this.setState({ loginOtpErrorMessage: 'OTP is required' });
          return;
        }

        // login
        const token = await login({ mobile: this.state.loginMobile, otp: this.state.loginOTP });
        const tokenObject = fetchDateFromToken(token);
        this.props.setUser({ ...tokenObject, token });

        localStorage.setItem('XFLK', token);

        this.props.setAlert({ type: 'Success', message: 'Logged in successfully' });

        this.setState({
          isShowLoginForm: false,
          isDisabled: false,
          isShowOTP: false,
          loginMobile: null,
          loginOTP: null
        });
      } else {
        if (!this.validateLoginMobile()) return;

        this.setState({ isDisabled: true });

        // request OTP for login
        const message = await requestLoginOTP({ mobile: this.state.loginMobile });

        this.props.setAlert({ type: 'Success', message });

        this.setState({ isShowOTP: true, isDisabled: false });
      }
    } catch (error) {
      this.props.setAlert({ type: 'Error', message: error.message });
      this.setState({ isDisabled: false });
    }
  };

  render() {
    return (
      <>
        <Segment style={{ padding: '4em 0em' }} vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column>
                <Header as="h3" style={{ fontSize: '2em' }}>
                  We help to track your small business loans
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                  You can add members and track their savings and loans. Get details realtime stats based on the
                  transactions you have done over the time period, everything just some clicks away. For any help please
                  mail us at {process.env.REACT_APP_NOTIFY_EMAIL}
                </p>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column textAlign="center">
                <Button as="a" inverted primary onClick={this.toggleLoginForm}>
                  Log in
                </Button>

                <Button as="a" inverted primary style={{ marginLeft: '0.5em' }} onClick={this.toggleSignUpForm}>
                  Sign Up
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        {this.state.isShowSignUpForm ? (
          <MemberForm
            header="Create Account"
            member={this.state.account}
            updateMember={this.updateAccount}
            onClose={this.toggleSignUpForm}
            onSubmit={this.onSubmitSignUp}
            isDisabled={this.state.isDisabled}
          />
        ) : null}

        {this.state.isShowLoginForm ? (
          <LoginForm
            header="Login User"
            loginMobile={this.state.loginMobile}
            updateLoginMobile={this.updateLoginMobile}
            loginMobileErrorMessage={this.state.loginMobileErrorMessage}
            isShowOTP={this.state.isShowOTP}
            loginOTP={this.state.loginOTP}
            updateLoginOTP={this.updateLoginOTP}
            loginOtpErrorMessage={this.state.loginOtpErrorMessage}
            onClose={this.toggleLoginForm}
            onSubmit={this.onSubmitLogin}
            isDisabled={this.state.isDisabled}
          />
        ) : null}
      </>
    );
  }
}

const mapDispatchToProps = { setAlert, setUser };

export default connect(null, mapDispatchToProps)(LandingPage);
