import React, { useContext } from 'react';
import { Card } from 'semantic-ui-react';

import { ResponsiveContext } from '../../../context';

import LoanCard from './card';

const LoanList = ({ loans }) => {
  const responsiveValue = useContext(ResponsiveContext);

  if (!loans.length) return <div>No loans found</div>;

  return (
    <Card.Group style={{ marginBottom: '1em' }} itemsPerRow={responsiveValue === 'web' ? 2 : 1}>
      {loans.map(({ _id }, index) => (
        <LoanCard key={_id} index={index} loanId={_id} />
      ))}
    </Card.Group>
  );
};

export default LoanList;
