import React from "react";
import PropTypes from "prop-types";

import Desktop from "./desktop";
import Mobile from "./mobile";

const Layout = ({ children, history, location }) => {
  const onClickNavigate = page => history.push(page);

  return (
    <div>
      <Desktop onClickNavigate={onClickNavigate} pathname={location.pathname}>
        {children}
      </Desktop>
      <Mobile
        onClickNavigate={onClickNavigate}
        pathname={location.pathname}
      >
        {children}
      </Mobile>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node
};

export default Layout;
