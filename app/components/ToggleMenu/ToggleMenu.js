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
    const { show } = this.state;
    if (show && this.menuRef && !this.menuRef.contains(event.target)) {
      this.setState({ show: false });
    }
  }

  toggleMenu = (event) => {
    event.stopPropagation();

    const { show } = this.state;
    this.setState({ show: !show });
  }

  closeMenu = (evt, path) => {
    const { onClick } = this.props;

    this.setState({ show: false });
    onClick(evt, path);
  }

  render() {
    const { className, icon, menus, hasArrow } = this.props;
    const { show } = this.state;

    return (
      <div className={`menu-toggle-container ${className}`} ref={(node) => { this.menuRef = node; }}>
        <Button animation={false} className="menu-toggle-btn" icon={icon} onClick={this.toggleMenu} />
        { show && (
          <div className="menu-list">
            {hasArrow && <div className="arrow-up" />}
            <ul>
              {
                menus.map(({ label, path }, index) => (
                  <li key={`menu-index-${index.toString()}`} onClick={(evt) => this.closeMenu(evt, path)}>{label}</li>
                ))
              }
            </ul>
          </div>
        )}
      </div>
    );
  }
}

ToggleMenu.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string.isRequired,
  menus: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    path: PropTypes.string
  })).isRequired,
  hasArrow: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

ToggleMenu.defaultProps = {
  className: '',
  hasArrow: true
};

export default ToggleMenu;
