import React from 'react';
import PropTypes from 'prop-types';

import './Icon.scss';

const Icon = ({ path, className }) => (
  <i className={`icon ${className}`} style={{ WebkitMask: `url(${path})` }} />
);

Icon.propTypes = {
  path: PropTypes.string.isRequired,
  className: PropTypes.string
};

Icon.defaultProps = {
  className: ''
};

export default Icon;
