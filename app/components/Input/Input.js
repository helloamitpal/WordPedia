import React from 'react';
import PropTypes from 'prop-types';

import * as helper from '../../util/helper';
import Icon from '../Icon';
import searchIcon from '../../images/SVG/135-search.svg';
import mic from '../../images/SVG/031-mic.svg';

import './Input.scss';

const Input = ({ disabled, className, readOnly, onClick, onChange, value, type, placeholder }) => {
  let inputRef;

  const copyText = () => {
    helper.copyToClipboard(inputRef);
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className={`input-container ${className} ${type}`}>
      <input placeholder={placeholder} ref={(node) => { inputRef = node; }} readOnly={readOnly} disabled={disabled} onChange={onChange} value={value} />
      {type === 'search' && (
        <React.Fragment>
          <Icon className="search-icon-placeholder" path={searchIcon} />
          <Icon className="mic-icon" path={mic} />
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
