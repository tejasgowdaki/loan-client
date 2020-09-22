import React, { useState } from 'react';
import { Form, Dropdown } from 'semantic-ui-react';

import FormModal from '../../common/formModal';

import { accountOptions } from '../../../constants';

const SignUpForm = ({
  header,
  account: { name = '', mobile = '', type = null },
  updateAccount,
  onClose,
  onSubmit,
  isDisabled
}) => {
  const [nameError, setNameError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [typeError, setTypeError] = useState('');

  const onChangeName = (event) => {
    const value = event.target.value;
    updateAccount('name', value);
    setNameError(!value ? 'Please enter name' : '');
  };

  const onChangeMobile = (event) => {
    const value = event.target.value;
    if (value.length > 10) return;
    updateAccount('mobile', value);
    setMobileError(
      !value ? 'Please enter mobile number' : value.length !== 10 ? 'Mobile number should be 10 digits' : ''
    );
  };

  const onChangeType = (event, data) => {
    const value = data.value;
    updateAccount('type', value);
    setTypeError(!value ? 'Please select account type' : '');
  };

  const validate = () => {
    setNameError(!name ? 'Please enter name' : '');
    setMobileError(
      !mobile ? 'Please enter mobile number' : mobile.length !== 10 ? 'Mobile number should be 10 digits' : ''
    );
    setTypeError(!type ? 'Please select account type' : '');
  };

  const submitForm = (e) => {
    validate();
    onSubmit(e);
  };

  return (
    <FormModal header={header} onClose={onClose} onSubmit={submitForm} isDisabled={isDisabled}>
      <Form>
        <Form.Group widths="equal">
          <Form.Field fluid required>
            <label>Name</label>
            <input
              autoComplete="off"
              placeholder="Name"
              name="name"
              value={name}
              onChange={onChangeName}
              disabled={isDisabled}
            />
            <span style={{ color: 'red' }}>{nameError}</span>
          </Form.Field>

          <Form.Field fluid required>
            <label>Mobile</label>
            <input
              autoComplete="off"
              type="number"
              placeholder="Mobile"
              name="mobile"
              value={mobile}
              onChange={onChangeMobile}
              disabled={isDisabled}
            />
            <span style={{ color: 'red' }}>{mobileError}</span>
          </Form.Field>

          <Form.Field fluid required>
            <label>Account Type</label>
            <Dropdown
              placeholder="Select Account Type"
              fluid
              selection
              options={accountOptions}
              value={type}
              onChange={onChangeType}
            />
            <span style={{ color: 'red' }}>{typeError}</span>
          </Form.Field>
        </Form.Group>
      </Form>
    </FormModal>
  );
};

export default SignUpForm;
