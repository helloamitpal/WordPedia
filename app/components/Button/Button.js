import React from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

import Icon from '../Icon';

import './Button.scss';

const Button = ({ icon, onClick, className, label, animation, raisedButton, disabled }) => {
  const delayedClick = debounce((evt) => onClick(evt), 500, { maxWait: 500, leading: true, trailing: false });

  const debouncedClick = (evt) => {
    evt.persist();
    delayedClick(evt);
  };
  return (
    <button disabled={disabled} type="button" className={`button ${className} ${!animation ? 'no-anim' : ''} ${raisedButton ? 'raised' : ''}`} onClick={debouncedClick}>
      {icon && <Icon path={icon} animation={animation} />}
      {label && <span>{label}</span>}
    </button>
  );
};

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
