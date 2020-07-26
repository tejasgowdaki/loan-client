import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';

import FormModal from '../../common/formModal';

const LoanForm = ({ name, onClose, onSubmit, isDisabled, loan = null }) => {
  const [amount, setAmount] = useState(loan ? loan.amount : 0);
  const [amountError, setAmountError] = useState('');

  const onChangeAmount = (event) => {
    const value = +event.target.value;
    setAmount(value);
    setAmountError(value ? '' : 'Please enter amount');
  };

  const validate = () => {
    setAmountError(amount ? '' : 'Please enter amount');
    return amount;
  };

  const submitForm = (e) => {
    e.preventDefault();

    const isValid = validate();
    if (!isValid) return true;

    onSubmit(amount);
  };

  return (
    <FormModal
      header={loan ? `Update loan for ${name}` : `Create new loan for ${name}`}
      onClose={onClose}
      onSubmit={submitForm}
      isDisabled={isDisabled}
    >
      <Form>
        <Form.Group widths="equal">
          <Form.Field fluid="true" required>
            <label>Amount</label>

            <input
              autoComplete="off"
              placeholder="Amount"
              name="amount"
              value={amount}
              onChange={onChangeAmount}
              disabled={isDisabled}
              style={{ maxWidth: '300px' }}
            />

            <span style={{ color: 'red' }}>{amountError}</span>
          </Form.Field>
        </Form.Group>
      </Form>
    </FormModal>
  );
};

export default LoanForm;
