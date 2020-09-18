import React from 'react';
import { Card, Icon, Header, Button, Label } from 'semantic-ui-react';

import { formatAmount } from '../../../helpers/utils';

const ShowCard = ({ name, mobile, totalSaving, remainingLoanAmount, toggleDepositForm, openLoanForm, isDisabled }) => {
  return (
    <div style={{ marginDown: '5em' }}>
      <Card.Group>
        <Card style={{ width: 'auto', marginTop: '2em', marginLeft: '1.5em', marginRight: '1.5em' }}>
          <Card.Content>
            <Header>Member Details</Header>

            <Card.Header>
              <strong>{name}</strong>
            </Card.Header>

            <Card.Description>
              <Label float="left" style={{ margin: '.3em ' }}>
                <Icon name="mobile alternate" /> {mobile}
              </Label>

              <Label float="left" style={{ margin: '.3em ' }}>
                Savings: <Icon name="rupee sign" />
                {formatAmount(totalSaving)}
              </Label>

              <Label float="left" style={{ margin: '.3em ' }}>
                Remaining loan amount: <Icon name="rupee sign" />
                {formatAmount(remainingLoanAmount)}
              </Label>
            </Card.Description>
          </Card.Content>

          <Card.Content extra>
            <Button as="a" size="small" color="green" disabled={isDisabled} onClick={toggleDepositForm}>
              Add Saving
            </Button>

            <Button as="a" size="small" color="blue" disabled={isDisabled} onClick={() => openLoanForm(null)}>
              New Loan
            </Button>
          </Card.Content>
        </Card>
      </Card.Group>
    </div>
  );
};

export default ShowCard;
