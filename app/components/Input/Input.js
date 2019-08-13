import React from 'react';
import PropTypes from 'prop-types';

import * as helper from '../../util/helper';
import Icon from '../Icon';
import searchIcon from '../../images/SVG/135-search.svg';
import micIcon from '../../images/SVG/031-mic.svg';
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
    const { disabled, className, readOnly, onChange, value, type, placeholder, onClearInput } = this.props;
    const { expanded } = this.state;

    return (
      <div className={`input-container ${expanded && type === 'search' ? 'focused' : ''} ${className} ${type} ${value ? 'has-input' : ''}`}>
        <input
          placeholder={placeholder}
          ref={(node) => { this.inputRef = node; }}
          readOnly={readOnly}
          disabled={disabled}
          onChange={onChange}
          value={value}
          onFocus={() => this.onFocusChange(true)}
          onBlur={() => this.onFocusChange(false)}
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
