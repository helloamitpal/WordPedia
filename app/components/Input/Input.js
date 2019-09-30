/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import PropTypes from 'prop-types';

import * as helper from '../../util/helper';
import Icon from '../Icon';
import Button from '../Button';
import searchIcon from '../../images/SVG/135-search.svg';
import uploadIcon from '../../images/SVG/199-upload2.svg';
import crossIcon from '../../images/SVG/272-cross.svg';

import './Input.scss';

class Input extends React.Component {
  constructor() {
    super();
    this.inputRef = null;
    this.state = {
      expanded: false
    };
  }

  onFocusChange = (expanded) => {
    const { type } = this.props;

    if (type === 'search') {
      this.setState({ expanded });
    }
  }

  copyText = () => {
    const { onClick } = this.props;

    helper.copyToClipboard(this.inputRef);
    if (onClick) {
      onClick();
    }
  }

  render() {
    const { disabled, className, readOnly, onChange, value, type, placeholder, onClearInput, onSecondaryInput, autoFocus } = this.props;
    const { expanded } = this.state;

    return (
      <div className={`input-container ${expanded && type === 'search' ? 'focused' : ''} ${className} ${type} ${value ? 'has-input' : ''}`}>
        <input
          placeholder={placeholder}
          ref={(node) => { this.inputRef = node; }}
          readOnly={readOnly}
          disabled={disabled}
          onChange={onChange}
          autoFocus={autoFocus}
          value={value}
          onFocus={() => this.onFocusChange(true)}
          onBlur={() => this.onFocusChange(false)}
        />
        {type === 'search' && (
          <React.Fragment>
            <Icon className="search-icon-placeholder" path={searchIcon} />
            <Button href="!#" className="rich-input-icon" animation={false} onClick={onSecondaryInput} icon={uploadIcon} />
            <Button onClick={onClearInput} animation={false} className="remove-text-icon" icon={crossIcon} />
          </React.Fragment>)
        }
        {type === 'copy' && <button type="button" onClick={this.copyText}>Copy Link</button>}
      </div>
    );
  }
}

Input.propTypes = {
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  readOnly: PropTypes.bool,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  onClearInput: PropTypes.func,
  onSecondaryInput: PropTypes.func,
  autoFocus: PropTypes.bool,
  type: PropTypes.oneOf(['search', 'copy', 'text']),
  placeholder: PropTypes.string
};

Input.defaultProps = {
  className: '',
  readOnly: false,
  disabled: false,
  type: 'text',
  autoFocus: false,
  placeholder: 'Search'
};

export default Input;
