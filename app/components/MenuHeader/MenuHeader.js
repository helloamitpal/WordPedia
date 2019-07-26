import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import backIcon from '../../images/SVG/313-arrow-left.svg';
import './MenuHeader.scss';

const MenuHeader = ({ label, history }) => {
  const goBackPrevPage = () => {
    history.push('/');
  };

  return (
    <div className="menu-header-container">
      <Button onClick={goBackPrevPage} className="back-btn" animation={false} icon={backIcon} />
      {label}
    </div>
  );
};

MenuHeader.defaultProps = {
  label: ''
};

MenuHeader.propTypes = {
  label: PropTypes.string,
  history: PropTypes.object.isRequired
};

export default MenuHeader;
