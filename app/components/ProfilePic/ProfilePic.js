import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';
import userIcon from '../../images/SVG/114-user.svg';
import './ProfilePic.scss';

class ProfilePic extends React.Component {
  constructor() {
    super();
    this.state = {
      failedImgLoad: false
    };
  }

  onLoadImg = (flag) => {
    this.setState({ failedImgLoad: flag });
  }

  render() {
    const { path, className, onClick, height, width } = this.props;
    const { failedImgLoad } = this.state;
    const isImg = path && !failedImgLoad;

    return (
      <div className={`profile-pic ${className} ${isImg ? '' : 'no-pic'}`} style={{ width, height }} onClick={onClick}>
        {isImg ? <img src={path} alt="user_profile" onLoad={() => this.onLoadImg(false)} onError={() => this.onLoadImg(true)} /> : <Icon path={userIcon} />}
      </div>
    );
  }
}

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
