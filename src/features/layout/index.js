import React from 'react';
import PropTypes from 'prop-types';
import { createMedia } from '@artsy/fresnel';
import { Sidebar } from 'semantic-ui-react';

import { ResponsiveContext } from '../../context';

import Desktop from './desktop';
import Mobile from './mobile';

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024
  }
});

const Layout = ({ name, logout, children, history, location }) => (
  <MediaContextProvider>
    <Media greaterThan="mobile">
      <ResponsiveContext.Provider value="web">
        <Desktop
          name={name}
          onClickNavigate={(page) => history.push(page)}
          pathname={location.pathname}
          logout={logout}
        >
          {children}
        </Desktop>
      </ResponsiveContext.Provider>
    </Media>

    <Media as={Sidebar.Pushable} at="mobile">
      <ResponsiveContext.Provider value="mobile">
        <Mobile name={name} onClickNavigate={(page) => history.push(page)} pathname={location.pathname} logout={logout}>
          {children}
        </Mobile>
      </ResponsiveContext.Provider>
    </Media>
  </MediaContextProvider>
);

Layout.propTypes = {
  children: PropTypes.node
};

export default Layout;
