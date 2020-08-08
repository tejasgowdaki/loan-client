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
    const { children } = this.props;
    const { fixed } = this.state;

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility once={false} onBottomPassed={this.showFixedMenu} onBottomPassedReverse={this.hideFixedMenu}>
          <Segment inverted textAlign="center" style={{ minHeight: 70, padding: '1em 0em' }} vertical>
            <Menu fixed={fixed ? 'top' : null} inverted={!fixed} pointing={!fixed} secondary={!fixed} size="large">
              <Container>
                <Menu.Item as="a" header onClick={() => this.props.onClickNavigate('/')}>
                  Loan Manager
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
                  active={this.props.pathname === '/stats'}
                  onClick={() => this.props.onClickNavigate('/stats')}
                >
                  Stats
                </Menu.Item>

                <Menu.Item position="right">
                  <Button as="a" inverted={!fixed}>
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
