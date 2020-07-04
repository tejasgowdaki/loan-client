import React from "react";
import { Modal, Button, Icon } from "semantic-ui-react";

const FormModal = ({ header, onClose, onSubmit, isDisabled, children }) => (
  <Modal open centered={false}>
    <Modal.Header>{header}</Modal.Header>
    <Modal.Content scrolling>{children}</Modal.Content>
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
