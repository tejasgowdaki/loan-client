import React from 'react';
import { Card, Icon, Header, Button } from 'semantic-ui-react';

const ShowCard = ({ name, mobile, totalSaving, toggleDepositForm, openLoanForm, isDisabled }) => {
  return (
    <div style={{ marginDown: '5em' }}>
      <Card.Group>
        <Card style={{ marginTop: '2em', marginLeft: '1.5em', width: 'auto' }}>
          <Card.Content>
            <Header>Member Details</Header>

            <Card.Header>{name}</Card.Header>

            <Card.Description>
              <span style={{ paddingRight: '3em ' }}>
                <Icon name="mobile alternate" /> {mobile}
              </span>

              <span style={{ paddingRight: '3em ' }}>Savings: Rs. {totalSaving}</span>
            </Card.Description>
          </Card.Content>

          <Card.Content extra>
            <Button as="a" size="small" color="green" disabled={isDisabled} onClick={toggleDepositForm}>
              Add Deposit
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
