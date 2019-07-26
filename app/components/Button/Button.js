import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';

import './Button.scss';

const Button = ({ icon, onClick, className, label, animation, raisedButton, disabled }) => (
  <button disabled={disabled} type="button" className={`button ${className} ${!animation ? 'no-anim' : ''} ${raisedButton ? 'raised' : ''}`} onClick={onClick}>
    {icon && <Icon path={icon} animation={animation} />}
    {label && <span>{label}</span>}
  </button>
);

Button.defaultProps = {
  icon: '',
  className: '',
  animation: true,
  raisedButton: false,
  disabled: false
};

Button.propTypes = {
  icon: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  label: PropTypes.string,
  animation: PropTypes.bool,
  raisedButton: PropTypes.bool,
  disabled: PropTypes.bool
};

export default Button;
