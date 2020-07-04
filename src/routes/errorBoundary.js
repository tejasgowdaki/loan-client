import React, { Component } from "react";
import { Button } from "semantic-ui-react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    try {
      this.setState({ hasError: true });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="errorPageBody">
          <center>What did you do now? Press that button..</center>
          <center>
            <Button
              primary
              compact
              content="Reload"
              onClick={() => window.location.reload()}
            />
          </center>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
