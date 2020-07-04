import React from "react";
import { Container } from "semantic-ui-react";

import Navigation from "../features/navigation/containers";
import TopBar from "../commonComponents/topBar";

const AppLayout = ({ children }) => {
  return (
    <div className="layout-wrapper">
      <TopBar>
        <Navigation />
      </TopBar>

      <Container fluid className="layout-inner" id="app-wrapper">
        {children}
      </Container>
    </div>
  );
};

export default AppLayout;
