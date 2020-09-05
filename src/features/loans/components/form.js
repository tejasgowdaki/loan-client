import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';

import FormModal from '../../common/formModal';

const LoanForm = ({ name, onClose, onSubmit, isDisabled, loan = null, isSubLoan = false }) => {
  const [amount, setAmount] = useState(loan ? loan.amount : 0);
  const [date, setDate] = useState(loan ? loan.date : null);
  const [amountError, setAmountError] = useState('');
  const [dateError, setDateError] = useState('');

  const onChangeAmount = (event) => {
    const value = +event.target.value;
    setAmount(value);
    setAmountError(value ? '' : 'Please enter amount');
  };

  const onChangeDate = (event, data) => {
    const value = data.value;
    setDate(value);
    setDateError(value ? '' : 'Please enter date');
  };

  const validate = () => {
    setAmountError(amount ? '' : 'Please enter amount');
    setDateError(date ? '' : 'Please enter date');
    return amount && date;
  };

  const submitForm = (e) => {
    e.preventDefault();

    const isValid = validate();
    if (!isValid) return true;

    onSubmit(amount, date);
  };

  return (
    <FormModal
      header={
        loan
          ? `Update ${isSubLoan ? 'additional loan' : 'loan'} of ${name}`
          : `Create ${isSubLoan ? 'additional loan' : 'new loan'} for ${name}`
      }
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

          <Form.Field fluid required className="date-picker" id="date-picker">
            <label>Date</label>

            <SemanticDatepicker
              format="DD-MM-YYYY"
              value={date}
              onChange={onChangeDate}
              showToday={false}
              datePickerOnly
              style={{ minWidth: '300px' }}
            />

            <span style={{ color: 'red' }}>{dateError}</span>
          </Form.Field>
        </Form.Group>
      </Form>
    </FormModal>
  );
};

export default LoanForm;
