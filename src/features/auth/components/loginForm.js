import React from 'react';
import { Form, Dropdown } from 'semantic-ui-react';

import FormModal from '../../common/formModal';

const LoginForm = ({
  header,
  loginMobile,
  updateLoginMobile,
  loginMobileErrorMessage,
  accounts,
  loginAccount,
  updateLoginAccount,
  loginAccountErrorMessage,
  isShowOTP,
  loginOTP,
  updateLoginOTP,
  loginOtpErrorMessage,
  onClose,
  onSubmit,
  isDisabled
}) => {
  const filteredAccounts = accounts.filter(({ mobile }) => mobile === loginMobile);

  return (
    <FormModal
      header={header}
      onClose={onClose}
      onSubmit={onSubmit}
      isDisabled={isDisabled}
      submitLabel={isShowOTP ? 'Login' : 'Request OTP'}
    >
      <Form>
        <Form.Group widths="equal">
          <Form.Field fluid required>
            <label>Mobile</label>
            <input
              autoComplete="off"
              type="number"
              placeholder="Mobile"
              name="mobile"
              value={loginMobile}
              onChange={(e) => updateLoginMobile(e.target.value)}
              disabled={isDisabled || isShowOTP}
            />
            <span style={{ color: 'red' }}>{loginMobileErrorMessage}</span>
          </Form.Field>

          <Form.Field fluid required>
            <label>Account</label>
            <Dropdown
              placeholder="Select Account"
              fluid
              selection
              options={filteredAccounts}
              value={loginAccount}
              disabled={isDisabled || isShowOTP}
              onChange={updateLoginAccount}
            />

            <span style={{ color: 'red' }}>{loginAccountErrorMessage}</span>
          </Form.Field>

          {isShowOTP ? (
            <Form.Field fluid required>
              <label>OTP</label>
              <input
                autoComplete="off"
                type="number"
                placeholder="OTP"
                name="OTP"
                value={loginOTP}
                onChange={(e) => updateLoginOTP(e.target.value)}
                disabled={isDisabled}
              />
              <span style={{ color: 'red' }}>{loginOtpErrorMessage}</span>
            </Form.Field>
          ) : null}
        </Form.Group>
      </Form>
    </FormModal>
  );
};

export default LoginForm;
