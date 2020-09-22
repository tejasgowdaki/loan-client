import React from 'react';
import { Card, Header, Button, Label, Icon } from 'semantic-ui-react';

import { formatAmount } from '../../../helpers/utils';

const ChitCard = ({
  toggleForm,
  isDisabled,
  chitsCount,
  totalAmountCollected,
  totalAmountPaid,
  totalAmountInPurse
}) => {
  return (
    <div style={{ marginDown: '5em' }}>
      <Card.Group>
        <Card style={{ width: 'auto', marginTop: '2em', marginLeft: '1.5em', marginRight: '1.5em' }}>
          <Card.Content>
            <Header>Chit Details</Header>

            <Card.Description>
              <Label float="left" style={{ margin: '.3em ' }}>
                No. of chits completed: {chitsCount}
              </Label>
              <Label float="left" style={{ margin: '.3em ' }}>
                Total Amount Received: <Icon name="rupee sign" />
                {formatAmount(totalAmountCollected)}
              </Label>
              <Label float="left" style={{ margin: '.3em ' }}>
                Total Amount Paid: <Icon name="rupee sign" />
                {formatAmount(totalAmountPaid)}
              </Label>

              <Label float="left" style={{ margin: '.3em ' }}>
                Total Amount in Purse: <Icon name="rupee sign" />
                {formatAmount(totalAmountInPurse)}
              </Label>
            </Card.Description>
          </Card.Content>

          <Card.Content extra>
            <Button as="a" size="small" color="blue" disabled={isDisabled} onClick={toggleForm}>
              New Chit
            </Button>
          </Card.Content>
        </Card>
      </Card.Group>
    </div>
  );
};

export default ChitCard;
