import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';

import FormModal from '../../common/formModal';

const PaymentForm = ({ name, onClose, onSubmit, isDisabled, nextInterest = 0 }) => {
  const [amount, setAmount] = useState(0);
  const [interest, setInterest] = useState(nextInterest);
  const [date, setDate] = useState(null);
  const [amountError, setAmountError] = useState('');
  const [dateError, setDateError] = useState('');

  const onChangeAmount = (event) => {
    const value = +event.target.value;
    setAmount(value);
  };

  const onChangeInterest = (event) => {
    const value = +event.target.value;
    setInterest(value);
  };

  const onChangeDate = (event, data) => {
    const value = data.value;
    setDate(value);
    setDateError(value ? '' : 'Please enter date');
  };

  const validate = () => {
    setAmountError(amount || interest ? '' : 'Please enter either amount or interest');
    setDateError(date ? '' : 'Please enter date');

    return (amount || interest) && date;
  };

  const submitForm = (e) => {
    e.preventDefault();

    const isValid = validate();
    if (!isValid) return true;
    onSubmit(amount, interest, date);
  };

  return (
    <FormModal header={`Loan payment for ${name}`} onClose={onClose} onSubmit={submitForm} isDisabled={isDisabled}>
      <Form>
        <Form.Group widths="equal">
          <Form.Field fluid="true">
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

          <Form.Field fluid="true">
            <label>Interest</label>

            <input
              autoComplete="off"
              placeholder="Interest"
              name="interest"
              value={interest}
              onChange={onChangeInterest}
              disabled={isDisabled}
              style={{ maxWidth: '300px' }}
            />
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

export default PaymentForm;
