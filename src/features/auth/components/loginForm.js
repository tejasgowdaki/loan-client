import React from 'react';
import { Form } from 'semantic-ui-react';

import FormModal from '../../common/formModal';

const LoginForm = ({
  header,
  loginMobile,
  updateLoginMobile,
  loginMobileErrorMessage,
  isShowOTP,
  loginOTP,
  updateLoginOTP,
  loginOtpErrorMessage,
  onClose,
  onSubmit,
  isDisabled
}) => {
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
              value={loginMobile || ''}
              onChange={(e) => updateLoginMobile(e.target.value)}
              disabled={isDisabled || isShowOTP}
            />
            <span style={{ color: 'red' }}>{loginMobileErrorMessage}</span>
          </Form.Field>

          {isShowOTP ? (
            <Form.Field fluid required>
              <label>OTP</label>
              <input
                autoComplete="off"
                type="number"
                placeholder="OTP"
                name="OTP"
                value={loginOTP || ''}
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
