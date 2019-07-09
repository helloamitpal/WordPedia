import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';

import infoIcon from '../../images/SVG/269-info.svg';
import errorIcon from '../../images/SVG/270-cancel-circle.svg';
import checkIcon from '../../images/SVG/273-checkmark.svg';
import './Message.scss';

const Message = ({ className, text, type, subInfo }) => {
  const iconSet = {
    error: errorIcon,
    info: infoIcon,
    success: checkIcon
  };
  return (
    <div className={`message-container ${className} ${type}`}>
      <div className="main-text-container">
        <Icon path={iconSet[type]} />
        <p>{text}</p>
      </div>
      <p className="sub-info">{subInfo}</p>
    </div>
  );
};

Message.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  subInfo: PropTypes.string,
  type: PropTypes.oneOf(['info', 'success', 'error'])
};

Message.defaultProps = {
  className: '',
  type: 'info',
  subInfo: ''
};

export default Message;
