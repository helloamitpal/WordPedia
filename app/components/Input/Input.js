import React from 'react';
import PropTypes from 'prop-types';

import * as helper from '../../util/helper';

import './Input.scss';

const Input = ({ disabled, className, readOnly, copy, onClick, onChange, value }) => {
  let inputRef;

  const copyText = () => {
    helper.copyToClipboard(inputRef);
    onClick();
  };

  return (
    <div className={`input-container ${className} ${copy ? 'copy' : ''}`}>
      <input ref={(node) => { inputRef = node; }} readOnly={readOnly} disabled={disabled} onChange={onChange} value={value} />
      {copy && <button type="button" onClick={copyText}>Copy Link</button>}
    </div>
  );
};

Input.propTypes = {
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  readOnly: PropTypes.bool,
  copy: PropTypes.bool,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  disabled: PropTypes.bool
};

Input.defaultProps = {
  className: '',
  readOnly: false,
  copy: false,
  disabled: false
};

export default Input;
