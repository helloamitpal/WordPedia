import React from 'react';
import PropTypes from 'prop-types';

import './Icon.scss';

const Icon = ({ path, className, animation }) => (
  <i className={`icon ${className} ${animation ? '' : 'no-anim'}`} style={{ WebkitMask: `url(${path})` }} />
);

Icon.propTypes = {
  path: PropTypes.string.isRequired,
  className: PropTypes.string,
  animation: PropTypes.bool
};

Icon.defaultProps = {
  className: '',
  animation: true
};

export default Icon;
