import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import './FooterMenu.scss';

const FooterMenu = ({ className, menus }) => {
  const menuList = menus.map(({ label, onClick, icon }, index) => (
    <Button key={`menu-item-${index.toString()}`} className="menu-item" onClick={onClick} icon={icon} label={label} />
  ));

  return (
    <div className={`${className} gradient-background footer-menu-container`}>{menuList}</div>
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
