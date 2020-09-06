import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Responsive, Button, Container, Menu, Segment, Visibility } from 'semantic-ui-react';

const getWidth = () => {
  const isSSR = typeof window === 'undefined';

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class Desktop extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children, name = '', pathname, onClickNavigate, logout } = this.props;
    const { fixed } = this.state;

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility once={false} onBottomPassed={this.showFixedMenu} onBottomPassedReverse={this.hideFixedMenu}>
          <Segment inverted textAlign="center" style={{ minHeight: 70, padding: '1em 0em' }} vertical>
            <Menu fixed={fixed ? 'top' : null} inverted={!fixed} pointing={!fixed} secondary={!fixed} size="large">
              <Container>
                <Menu.Item as="a" header onClick={() => onClickNavigate('/')}>
                  {name || 'Loan Manager'}
                </Menu.Item>

                <Menu.Item as="a" active={pathname === '/members'} onClick={() => onClickNavigate('/members')}>
                  Members
                </Menu.Item>

                <Menu.Item
                  as="a"
                  active={pathname === '/active-loans'}
                  onClick={() => onClickNavigate('/active-loans')}
                >
                  Active Loans
                </Menu.Item>

                <Menu.Item
                  as="a"
                  active={pathname === '/transactions'}
                  onClick={() => onClickNavigate('/transactions')}
                >
                  Transactions
                </Menu.Item>

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
