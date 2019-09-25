import React from 'react';
import PropTypes from 'prop-types';
import './LoadingIndicator.scss';

const LoadingIndicator = ({ type }) => {
  let html = '';
  if (type === 'linear') {
    html = (
      <React.Fragment>
        <div />
        <div />
        <div />
      </React.Fragment>
    );
  } else if (type === 'wave') {
    html = (
      <React.Fragment>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </React.Fragment>
    );
  }
  return <div className={`loading-indicator ${type}`}>{html}</div>;
};

LoadingIndicator.defaultProps = {
  type: 'linear'
};

LoadingIndicator.propTypes = {
  type: PropTypes.oneOf(['linear', 'wave'])
};

export default LoadingIndicator;
