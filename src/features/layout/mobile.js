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
            active={this.props.pathname === '/members'}
            onClick={() => this.props.onClickNavigate('/members')}
          >
            Members
          </Menu.Item>

          <Menu.Item
            as="a"
            active={this.props.pathname === '/loans'}
            onClick={() => this.props.onClickNavigate('/loans')}
          >
            Loans
          </Menu.Item>

          <Menu.Item
            as="a"
            active={this.props.pathname === '/savings'}
            onClick={() => this.props.onClickNavigate('/savings')}
          >
            Savings
          </Menu.Item>

          <Menu.Item as="a">Log in</Menu.Item>

          <Menu.Item as="a">Sign Up</Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment inverted textAlign="center" style={{ minHeight: 50, padding: '1em 0em' }} vertical>
            <Container>
              <Menu inverted pointing secondary size="large">
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name="sidebar" />
                </Menu.Item>
                <Menu.Item as="a" header>
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
