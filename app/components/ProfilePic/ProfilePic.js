import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';
import userIcon from '../../images/SVG/114-user.svg';
import './ProfilePic.scss';

const ProfilePic = ({ path, className, onClick, height, width }) => (
  <div className={`profile-pic ${className} ${path ? '' : 'no-pic'}`} style={{ width, height }} onClick={onClick}>
    {path ? <img src={path} alt="user_profile" /> : <Icon path={userIcon} />}
  </div>
);

ProfilePic.propTypes = {
  path: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  height: PropTypes.number,
  width: PropTypes.number
};

ProfilePic.defaultProps = {
  className: '',
  path: '',
  height: 40,
  width: 40
};

export default ProfilePic;
