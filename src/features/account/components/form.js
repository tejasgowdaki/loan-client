import React, { useState } from 'react';
import { Form, Dropdown } from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';

import FormModal from '../../common/formModal';

import { accountOptions, LOAN } from '../../../constants';

const AccountForm = ({
  header,
  account: { _id = null, name = '', type = null, config = {}, startDate = null },
  updateAccount,
  onClose,
  onSubmit,
  isDisabled
}) => {
  const [nameError, setNameError] = useState('');
  const [typeError, setTypeError] = useState('');

  const onChangeName = (event) => {
    const value = event.target.value;
    updateAccount('name', value);
    setNameError(!value ? 'Please enter name' : '');
  };

  const onChangeType = (event, data) => {
    const value = data.value;
    updateAccount('type', value);
    setTypeError(!value ? 'Please select account type' : '');
  };

  const onChangeStartDate = (event, data) => {
    const value = data.value;
    updateAccount('startDate', value);
  };

  const onChangeConfig = (key, value) => {
    const updateConfig = { ...config, [key]: value ? value : 0 };
    updateAccount('config', updateConfig);
  };

  const validate = () => {
    setNameError(!name ? 'Please enter name' : '');
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

          {!_id ? (
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
          ) : null}

          <Form.Field fluid required className="date-picker" id="date-picker">
            <label>Start Date</label>

            <SemanticDatepicker
              format="DD-MM-YYYY"
              value={startDate}
              onChange={onChangeStartDate}
              showToday={false}
              datePickerOnly
              style={{ minWidth: '300px' }}
            />
          </Form.Field>

          {type === LOAN ? (
            <Form.Field fluid="true">
              <label>Interest Rate</label>

              <input
                autoComplete="off"
                placeholder="Interest Rate"
                name="interestRate"
                value={config.interestRate}
                onChange={(e) => onChangeConfig('interestRate', e.target.value)}
                disabled={isDisabled}
                style={{ maxWidth: '300px' }}
                type="number"
              />
            </Form.Field>
          ) : null}
        </Form.Group>
      </Form>
    </FormModal>
  );
};

export default AccountForm;
