import React from 'react';
import { Modal, Button, Icon } from 'semantic-ui-react';

const FormModal = ({ header, onClose, onSubmit, isDisabled, children }) => (
  <Modal open centered={false}>
    <Modal.Header>
      <span style={{ paddingRight: '3em ' }}>{header}</span>
    </Modal.Header>

    <Modal.Content style={{ minHeight: 400 }} scrolling>
      {children}
    </Modal.Content>

    <Modal.Actions>
      <Button color="red" onClick={onClose} inverted disabled={isDisabled}>
        <Icon name="remove" /> Cancel
      </Button>
      <Button color="green" onClick={onSubmit} inverted disabled={isDisabled}>
        <Icon name="checkmark" /> Submit
      </Button>
    </Modal.Actions>
  </Modal>
);

export default FormModal;
