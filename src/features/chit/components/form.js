import React, { useState } from 'react';
import { Form, Dropdown } from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';

import FormModal from '../../common/formModal';

import { receiverOptions } from '../../../constants';

const ChitForm = ({ onClose, onSubmit, isDisabled, memberOptions }) => {
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(null);
  const [receiver, setReceiver] = useState(null);
  const [memberId, setMemberId] = useState(null);
  const [amountError, setAmountError] = useState('');
  const [dateError, setDateError] = useState('');
  const [receiverError, setReceiverError] = useState('');
  const [memberIdError, setMemberIdError] = useState('');

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

  const onChangeReceiver = (event, data) => {
    const value = data.value;
    setReceiver(value);
    setMemberId(null);
    setMemberIdError('');
    setReceiverError(!value ? 'Please select receiver' : '');
  };

  const onChangeMemberId = (event, data) => {
    const value = data.value;
    setMemberId(value);
    setMemberIdError(!value ? 'Please select member' : '');
  };

  const validate = () => {
    setAmountError(amount ? '' : 'Please enter amount');
    setDateError(date ? '' : 'Please enter date');
    setReceiverError(receiver ? '' : 'Please select receiver');
    setMemberIdError(receiver === 'member' && !memberId ? 'Please select member' : '');
    const isMemberValid = receiver === 'member' ? !!memberId : true;
    return amount && date && receiver && isMemberValid;
  };

  const submitForm = (e) => {
    e.preventDefault();

    const isValid = validate();
    if (!isValid) return true;

    onSubmit(amount, date, receiver, memberId);
  };

  return (
    <FormModal header="Add new chit" onClose={onClose} onSubmit={submitForm} isDisabled={isDisabled}>
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
            <br />
            <span style={{ color: 'red' }}>{dateError}</span>
          </Form.Field>

          <Form.Field fluid required>
            <label>Receiver</label>
            <Dropdown
              placeholder="Select Receiver"
              fluid
              selection
              options={receiverOptions}
              value={receiver}
              onChange={onChangeReceiver}
            />
            <span style={{ color: 'red' }}>{receiverError}</span>
          </Form.Field>

          {receiver === 'member' ? (
            <Form.Field fluid required>
              <label>Member</label>
              <Dropdown
                placeholder="Select Member"
                fluid
                selection
                options={memberOptions}
                value={memberId}
                onChange={onChangeMemberId}
              />
              <span style={{ color: 'red' }}>{memberIdError}</span>
            </Form.Field>
          ) : null}
        </Form.Group>
      </Form>
    </FormModal>
  );
};

export default ChitForm;
