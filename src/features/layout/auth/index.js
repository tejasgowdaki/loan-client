import React from 'react';
import PropTypes from 'prop-types';
import { createMedia } from '@artsy/fresnel';
import { Sidebar } from 'semantic-ui-react';

import { ResponsiveContext } from '../../../context';

import Desktop from './desktop';
import Mobile from './mobile';

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024
  }
});

const Layout = ({ children }) => (
  <MediaContextProvider>
    <Media greaterThan="mobile">
      <Desktop>
        <ResponsiveContext.Provider value="web">{children}</ResponsiveContext.Provider>
      </Desktop>
    </Media>

    <Media as={Sidebar.Pushable} at="mobile">
      <Mobile>
        <ResponsiveContext.Provider value="mobile">{children}</ResponsiveContext.Provider>
      </Mobile>
    </Media>
  </MediaContextProvider>
);

Layout.propTypes = {
  children: PropTypes.node
};

export default Layout;
