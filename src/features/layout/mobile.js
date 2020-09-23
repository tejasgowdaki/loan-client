import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Icon, Menu, Responsive, Segment, Sidebar, Header } from 'semantic-ui-react';

import { AccountTypeContext } from '../../context';

const getWidth = () => {
  const isSSR = typeof window === 'undefined';

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class Mobile extends Component {
  static contextType = AccountTypeContext;

  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children, accountName = '', pathname, onClickNavigate, logout, accountStartDate } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
        style={{ height: '100vh' }}
      >
        <Sidebar as={Menu} animation="push" inverted onHide={this.handleSidebarHide} vertical visible={sidebarOpened}>
          <Menu.Item as="a" active={pathname === '/'} onClick={() => onClickNavigate('/')}>
            Home
          </Menu.Item>

          <Menu.Item as="a" active={pathname === '/members'} onClick={() => onClickNavigate('/members')}>
            Members
          </Menu.Item>

          {this.context ? (
            <Menu.Item as="a" active={pathname === '/active-loans'} onClick={() => onClickNavigate('/active-loans')}>
              Active Loans
            </Menu.Item>
          ) : null}

          {!this.context ? (
            <Menu.Item as="a" active={pathname === '/chits'} onClick={() => onClickNavigate('/chits')}>
              Chits
            </Menu.Item>
          ) : null}

          <Menu.Item as="a" active={pathname === '/accounts'} onClick={() => onClickNavigate('/accounts')}>
            Accounts
          </Menu.Item>

          {this.context ? (
            <Menu.Item as="a" active={pathname === '/transactions'} onClick={() => onClickNavigate('/transactions')}>
              Transactions
            </Menu.Item>
          ) : null}

          {this.context ? (
            <Menu.Item as="a" active={pathname === '/stats'} onClick={() => onClickNavigate('/stats')}>
              Stats
            </Menu.Item>
          ) : null}

          <Menu.Item as="a" active={pathname === '/utilities'} onClick={() => onClickNavigate('/utilities')}>
            Utilities
          </Menu.Item>

          <Menu.Item as="a" onClick={logout}>
            Log Out
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment inverted textAlign="center" style={{ minHeight: 50, padding: '1em 0em' }} vertical>
            <Container>
              <Menu inverted pointing secondary size="large">
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name="sidebar" />
                </Menu.Item>

                <Menu.Item as="a" header onClick={() => onClickNavigate('/')}>
                  <Header as="h4" inverted>
                    {accountName || 'Loan Manager'}
                    <Header.Subheader>
                      <strong>{this.context ? 'Loan' : 'Chit '}</strong> Account{' '}
                      {accountStartDate ? `, ${accountStartDate}` : ''}
                    </Header.Subheader>
                  </Header>
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
