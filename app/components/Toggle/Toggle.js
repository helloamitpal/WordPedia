import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import './Toggle.scss';

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: props.disabled ? false : props.on
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({ toggle: newProps.disabled ? false : newProps.on });
  }

  toggle = () => {
    const { onToggle, disabled } = this.props;

    if (disabled) {
      toast.info('Please register yourself to enable quiz');
      return;
    }

    let { toggle } = this.state;
    toggle = !toggle;
    this.setState({ toggle });
    onToggle(toggle);
  }

  render() {
    const { className, label } = this.props;
    const { toggle } = this.state;

    return (
      <div className={`toggle-container ${className}`}>
        <div className={`toggler ${toggle ? 'active' : ''}`} onClick={this.toggle}>
          <div className="toggle-button" />
        </div>
        <span>{label}</span>
      </div>
    );
  }
}

Toggle.defaultProps = {
  on: false,
  className: '',
  disabled: false
};

Toggle.propTypes = {
  on: PropTypes.bool,
  label: PropTypes.string,
  className: PropTypes.string,
  onToggle: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

export default Toggle;
