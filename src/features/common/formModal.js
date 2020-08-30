import React from 'react';
import { Modal, Button, Icon } from 'semantic-ui-react';

const FormModal = ({ header, onClose, onSubmit, isDisabled, children, submitLabel = 'Submit' }) => (
  <Modal open centered={false}>
    <Modal.Header>
      <span style={{ paddingRight: '3em ' }}>{header}</span>
    </Modal.Header>

    <Modal.Content style={{ minHeight: 400 }} scrolling>
      {children}
    </Modal.Content>

    <Modal.Actions>
      <Button as="a" color="red" onClick={onClose} inverted disabled={isDisabled}>
        <Icon name="remove" /> Cancel
      </Button>
      <Button as="a" color="green" onClick={onSubmit} inverted disabled={isDisabled}>
        <Icon name="checkmark" /> {submitLabel}
      </Button>
    </Modal.Actions>
  </Modal>
);

export default FormModal;
