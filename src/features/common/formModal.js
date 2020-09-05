import React from 'react';
import { Modal, Button, Icon } from 'semantic-ui-react';

const FormModal = ({
  header,
  onClose,
  onSubmit,
  isDisabled,
  children,
  submitLabel = 'Submit',
  closeLabel = 'Cancel'
}) => (
  <Modal open centered={false} style={{ width: 'auto', height: 'auto' }}>
    <Modal.Header>
      <span style={{ paddingRight: '3em' }}>{header}</span>
    </Modal.Header>

    <Modal.Content style={{ width: 'auto', height: 'auto' }} scrolling>
      {children}
    </Modal.Content>

    <Modal.Actions>
      {onClose ? (
        <Button as="a" color="red" onClick={onClose} inverted disabled={isDisabled}>
          <Icon name="remove" /> {closeLabel}
        </Button>
      ) : null}

      {onSubmit ? (
        <Button as="a" color="green" onClick={onSubmit} inverted disabled={isDisabled}>
          <Icon name="checkmark" /> {submitLabel}
        </Button>
      ) : null}
    </Modal.Actions>
  </Modal>
);

export default FormModal;
