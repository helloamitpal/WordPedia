import React from 'react';
import PropTypes from 'prop-types';

import * as helper from '../../util/helper';
import Icon from '../Icon';
import searchIcon from '../../images/SVG/135-search.svg';
import micIcon from '../../images/SVG/031-mic.svg';
import crossIcon from '../../images/SVG/272-cross.svg';

import './Input.scss';

const Input = ({ disabled, className, readOnly, onClick, onChange, value, type, placeholder, onClearInput }) => {
  let inputRef;

  const copyText = () => {
    helper.copyToClipboard(inputRef);
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className={`input-container ${className} ${type} ${value ? 'has-input' : ''}`}>
      <input
        placeholder={placeholder}
        ref={(node) => { inputRef = node; }}
        readOnly={readOnly}
        disabled={disabled}
        onChange={onChange}
        value={value}
      />
      {type === 'search' && (
        <React.Fragment>
          <Icon className="search-icon-placeholder" path={searchIcon} />
          <Icon className="mic-icon" path={micIcon} />
          <a href="javascript:void(0)" onClick={onClearInput} className="remove-text-icon">
            <Icon path={crossIcon} />
          </a>
        </React.Fragment>)
      }
      {type === 'copy' && <button type="button" onClick={copyText}>Copy Link</button>}
    </div>
  );
};

Input.propTypes = {
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  readOnly: PropTypes.bool,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  onClearInput: PropTypes.func,
  type: PropTypes.oneOf(['search', 'copy', 'text']),
  placeholder: PropTypes.string
};

Input.defaultProps = {
  className: '',
  readOnly: false,
  disabled: false,
  type: 'text',
  placeholder: 'Search'
};

export default Input;
