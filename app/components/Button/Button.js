import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';

import './Button.scss';

const Button = ({ icon, onClick, className, label }) => (
  <button type="button" className={`button ${className}`} onClick={onClick}>
    {icon && <Icon path={icon} />}
    {label}
  </button>
);

Button.defaultProps = {
  icon: '',
  className: ''
};

Button.propTypes = {
  icon: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  label: PropTypes.string
};

export default Button;
