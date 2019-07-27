import React from 'react';
import PropTypes from 'prop-types';

import './Toggle.scss';

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: props.on
    };
  }

  toggle = () => {
    const { onToggle } = this.props;
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
  className: ''
};

Toggle.propTypes = {
  on: PropTypes.bool,
  label: PropTypes.string,
  className: PropTypes.string,
  onToggle: PropTypes.func.isRequired
};

export default Toggle;
