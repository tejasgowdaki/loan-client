import React from 'react';
import PropTypes from 'prop-types';

import Desktop from './desktop';
import Mobile from './mobile';

const Layout = ({ children }) => {
  return (
    <div>
      <Desktop>{children}</Desktop>
      <Mobile>{children}</Mobile>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node
};

export default Layout;
