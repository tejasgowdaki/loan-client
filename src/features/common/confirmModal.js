import React from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

const ConfirmModal = ({ header, content, submitTitle = 'Yes', onClickSubmit, cancelTitle = 'No', onClickCancel }) => (
  <Modal open basic size="small">
    <Header icon="archive" content={header} />
    <Modal.Content>
      <p>{content}</p>
    </Modal.Content>
    <Modal.Actions>
      <Button as="a" color="red" inverted onClick={onClickCancel}>
        <Icon name="remove" /> {cancelTitle}
      </Button>
      <Button as="a" color="green" inverted onClick={onClickSubmit}>
        <Icon name="checkmark" /> {submitTitle}
      </Button>
    </Modal.Actions>
  </Modal>
);

export default ConfirmModal;
