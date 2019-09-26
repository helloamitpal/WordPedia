import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';
import './LoadingIndicator.scss';
import image from '../../images/SVG/014-image.svg';

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
  } else if (type === 'scan') {
    html = (
      <React.Fragment>
        <em />
        <Icon path={image} />
        <span />
      </React.Fragment>
    );
  }
  return <div className={`loading-indicator ${type}`}>{html}</div>;
};

LoadingIndicator.defaultProps = {
  type: 'linear'
};

LoadingIndicator.propTypes = {
  type: PropTypes.oneOf(['linear', 'wave', 'scan'])
};

export default LoadingIndicator;
