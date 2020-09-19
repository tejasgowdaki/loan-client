import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Responsive, Button, Container, Menu, Segment, Visibility, Header } from 'semantic-ui-react';

import { AccountTypeContext } from '../../context';

const getWidth = () => {
  const isSSR = typeof window === 'undefined';

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class Desktop extends Component {
  static contextType = AccountTypeContext;

  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children, accountName = '', accountStartDate, pathname, onClickNavigate, logout } = this.props;
    const { fixed } = this.state;

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility once={false} onBottomPassed={this.showFixedMenu} onBottomPassedReverse={this.hideFixedMenu}>
          <Segment inverted textAlign="center" style={{ minHeight: 70, padding: '1em 0em' }} vertical>
            <Menu fixed={fixed ? 'top' : null} inverted={!fixed} pointing={!fixed} secondary={!fixed} size="large">
              <Container>
                <Menu.Item as="a" header onClick={() => onClickNavigate('/')}>
                  <Header as="h4" inverted>
                    {accountName || 'Loan Manager'}
                    <Header.Subheader>
                      <strong>{this.context ? 'Loan' : 'Chit '}</strong> Account,{' '}
                      {accountStartDate ? `${accountStartDate}` : ''}
                    </Header.Subheader>
                  </Header>
                </Menu.Item>

                <Menu.Item as="a" active={pathname === '/members'} onClick={() => onClickNavigate('/members')}>
                  Members
                </Menu.Item>

                {this.context ? (
                  <Menu.Item
                    as="a"
                    active={pathname === '/active-loans'}
                    onClick={() => onClickNavigate('/active-loans')}
                  >
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
                  <Menu.Item
                    as="a"
                    active={pathname === '/transactions'}
                    onClick={() => onClickNavigate('/transactions')}
                  >
                    Transactions
                  </Menu.Item>
                ) : null}

                <Menu.Item as="a" active={pathname === '/stats'} onClick={() => onClickNavigate('/stats')}>
                  Stats
                </Menu.Item>

                <Menu.Item as="a" active={pathname === '/utilities'} onClick={() => onClickNavigate('/utilities')}>
                  Utilities
                </Menu.Item>

                <Menu.Item position="right">
                  <Button as="a" inverted={!fixed} onClick={logout}>
                    Log Out
                  </Button>
                </Menu.Item>
              </Container>
            </Menu>
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    );
  }
}

Desktop.propTypes = {
  children: PropTypes.node
};

export default Desktop;
