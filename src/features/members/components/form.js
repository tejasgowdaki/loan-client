import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';

import FormModal from '../../common/formModal';

const MemberForm = ({
  member: { _id = null, name = '', mobile = '' },
  updateMember,
  onClose,
  onSubmit,
  isDisabled
}) => {
  const [nameError, setNameError] = useState('');
  const [mobileError, setMobileError] = useState('');

  const onChangeName = event => {
    updateMember('name', event.target.value);
  };

  const onChangeMobile = event => {
    if (event.target.value.length > 10) return;
    updateMember('mobile', event.target.value);
  };

  const validate = () => {
    setNameError(!name ? 'Please enter name' : '');
    setMobileError(
      !mobile ? 'Please enter mobile number' : mobile.length !== 10 ? 'Mobile number should be 10 digits' : ''
    );
  };

  const submitForm = e => {
    validate();
    onSubmit(e);
  };

  return (
    <FormModal
      header={_id ? 'Update Member' : 'Create Member'}
      onClose={onClose}
      onSubmit={submitForm}
      isDisabled={isDisabled}
    >
      <Form>
        <Form.Group widths='equal'>
          <Form.Field fluid required>
            <label>Name</label>
            <input
              autoComplete='off'
              placeholder='Name'
              name='name'
              value={name}
              onChange={onChangeName}
              disabled={isDisabled}
            />
            <span style={{ color: 'red' }}>{nameError}</span>
          </Form.Field>

          <Form.Field fluid required>
            <label>Mobile</label>
            <input
              autoComplete='off'
              type='number'
              placeholder='Mobile'
              name='mobile'
              value={mobile}
              onChange={onChangeMobile}
              disabled={isDisabled}
            />
            <span style={{ color: 'red' }}>{mobileError}</span>
          </Form.Field>
        </Form.Group>
      </Form>
    </FormModal>
  );
};

export default MemberForm;
