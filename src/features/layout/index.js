import React from 'react';
import PropTypes from 'prop-types';

import Desktop from './desktop';
import Mobile from './mobile';

const Layout = ({ name, logout, children, history, location }) => {
  const onClickNavigate = (page) => history.push(page);

  return (
    <div>
      <Desktop name={name} onClickNavigate={onClickNavigate} pathname={location.pathname} logout={logout}>
        {children}
      </Desktop>
      <Mobile name={name} onClickNavigate={onClickNavigate} pathname={location.pathname} logout={logout}>
        {children}
      </Mobile>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node
};

export default Layout;
