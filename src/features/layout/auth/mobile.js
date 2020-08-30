import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Menu, Responsive, Segment, Sidebar } from 'semantic-ui-react';

const getWidth = () => {
  const isSSR = typeof window === 'undefined';

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class Mobile extends Component {
  render() {
    const { children } = this.props;

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
        style={{ height: '100vh' }}
      >
        <Segment inverted textAlign="center" style={{ minHeight: 50, padding: '1em 0em' }} vertical>
          <Container>
            <Menu inverted pointing secondary size="large">
              <Menu.Item as="a" header>
                Loan Manager
              </Menu.Item>
            </Menu>
          </Container>
        </Segment>

        {children}
      </Responsive>
    );
  }
}

Mobile.propTypes = {
  children: PropTypes.node
};

export default Mobile;
