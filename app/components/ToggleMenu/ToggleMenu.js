import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';

import './ToggleMenu.scss';

class ToggleMenu extends React.Component {
  constructor() {
    super();
    this.menuRef = React.createRef();
    this.state = {
      show: false
    };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (this.menuRef && !this.menuRef.contains(event.target)) {
      this.setState({ show: false });
    }
  }

  toggleMenu = (event) => {
    event.stopPropagation();

    const { show } = this.state;
    this.setState({ show: !show });
  }

  render() {
    const { className, icon, menus, onClick } = this.props;
    const { show } = this.state;

    return (
      <div className={`menu-toggle-container ${className}`} ref={(node) => { this.menuRef = node; }}>
        <Button className="menu-toggle-btn" icon={icon} onClick={this.toggleMenu} />
        { show && (
          <ul className="menu-list">
            {
              menus.map(({ label, path }, index) => (
                <li key={`menu-index-${index.toString()}`} onClick={() => onClick(path)}>{label}</li>
              ))
            }
          </ul>
        )}
      </div>
    );
  }
}

ToggleMenu.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string.isRequired,
  menus: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired
};

ToggleMenu.defaultProps = {
  className: ''
};

export default ToggleMenu;
