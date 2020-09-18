import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';

import FormModal from '../../common/formModal';

const AccountForm = ({ header, account: { _id = null, name = '' }, updateAccount, onClose, onSubmit, isDisabled }) => {
  const [nameError, setNameError] = useState('');

  const onChangeName = (event) => {
    updateAccount('name', event.target.value);
  };

  const validate = () => {
    setNameError(!name ? 'Please enter name' : '');
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
        </Form.Group>
      </Form>
    </FormModal>
  );
};

export default AccountForm;
