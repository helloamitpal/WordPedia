import React from 'react';
import PropTypes from 'prop-types';

import './FooterMenu.scss';

const FooterMenu = ({ className, menus }) => {
  const menuList = menus.map(({ label, onClick, icon }, index) => (
    <div key={`menu-item-${index.toString()}`} className={`menu-item ${icon ? 'menu-icon' : ''}`} onClick={onClick}>
      {icon || label}
    </div>
  ));

  return (
    <div className={`${className} footer-menu-container`}>{menuList}</div>
  );
};

FooterMenu.propTypes = {
  className: PropTypes.string,
  menus: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    icon: PropTypes.node,
    onClick: PropTypes.func.isRequired
  })).isRequired
};

FooterMenu.defaultProps = {
  className: ''
};

export default FooterMenu;
