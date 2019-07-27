import React from 'react';
import PropTypes from 'prop-types';

import './SelectBox.scss';

const SelectBox = ({ options, onChange, disabled, value, selectText, className }) => (
  <div className={`selectbox-container ${className}`}>
    <select value={value} disabled={disabled} onChange={onChange}>
      {selectText ? <option value="-1" className="select-text" readOnly>{selectText}</option> : null}
      {
        options.map(({ key, label }) => (
          <option key={key} value={key}>{label}</option>
        ))
      }
    </select>
  </div>
);

SelectBox.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })).isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  className: PropTypes.string,
  selectText: PropTypes.string
};

SelectBox.defaultProps = {
  disabled: false,
  value: -1,
  className: '',
  selectText: ''
};

export default SelectBox;
