import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Button from '../Button';
import config from '../../config';

import backIcon from '../../images/SVG/321-arrow-left2.svg';

import './Header.scss';

const Header = ({ className, history, children }) => {
  const { location: { pathname } } = history;
  const gotoHomePage = () => {
    history.push(config.HOME_PAGE);
  };

  return (
    <div className={`header-container gradient-background ${className}`}>
      { pathname !== config.HOME_PAGE ? <Button icon={backIcon} className="back-btn" onClick={gotoHomePage} /> : null }
      {children}
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  history: PropTypes.object,
  children: PropTypes.node
};

Header.defaultProps = {
  className: ''
};

export default withRouter(Header);
