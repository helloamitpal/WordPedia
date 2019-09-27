import React from 'react';
import PropTypes from 'prop-types';

import EventTracker from '../event-tracker';
import Events from '../event-tracker/events';

import logo from '../images/logos/WordPedia-512x512.png';

class ErrorBoundary extends React.Component {
  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    EventTracker.raise(Events.APP_CRASHED, `${(info && info.componentStack) || 'The app is crashed due to unknown reason'}`);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <div className="error-container">
          <h1 className="gradient-background">Something went wrong</h1>
          <img src={logo} alt="logo" />
          <p>
            Sorry for the convenience caused.
            <br />
            We are working on it.
            <br />
            Stay connected.
          </p>
        </div>
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
};

export default ErrorBoundary;
