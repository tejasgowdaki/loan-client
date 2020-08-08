import React from 'react';
import { Card } from 'semantic-ui-react';

import LoanCard from './card';

const LoanList = ({ loans }) => {
  if (!loans.length) return <div>No loans found</div>;

  return (
    <Card.Group style={{ marginBottom: '2em' }}>
      {loans.map(({ _id }, index) => (
        <LoanCard key={_id} index={index} loanId={_id} />
      ))}
    </Card.Group>
  );
};

export default LoanList;
