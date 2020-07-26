import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Icon, Menu, Responsive, Segment, Sidebar } from 'semantic-ui-react';

const getWidth = () => {
  const isSSR = typeof window === 'undefined';

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class Mobile extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
        style={{ height: '100vh' }}
      >
        <Sidebar as={Menu} animation="push" inverted onHide={this.handleSidebarHide} vertical visible={sidebarOpened}>
          <Menu.Item as="a" active={this.props.pathname === '/'} onClick={() => this.props.onClickNavigate('/')}>
            Home
          </Menu.Item>

          <Menu.Item
            as="a"
            active={this.props.pathname === '/stats'}
            onClick={() => this.props.onClickNavigate('/stats')}
          >
            Stats
          </Menu.Item>

          <Menu.Item as="a">Log Out</Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment inverted textAlign="center" style={{ minHeight: 50, padding: '1em 0em' }} vertical>
            <Container>
              <Menu inverted pointing secondary size="large">
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name="sidebar" />
                </Menu.Item>

                <Menu.Item as="a" header onClick={() => this.props.onClickNavigate('/')}>
                  Loan Manager
                </Menu.Item>
              </Menu>
            </Container>
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    );
  }
}

Mobile.propTypes = {
  children: PropTypes.node
};

export default Mobile;
