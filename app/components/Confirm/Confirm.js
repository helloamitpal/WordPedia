import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';

import './Confirm.scss';

const Confirm = ({ onAccept, onDecline, buttonLabel, confirmText }) => {
  return (
    <div className={`confirm-container ${buttonLabel ? 'inline' : ''}`}>
      <p>{confirmText || 'If you deregister, no new words can be added to bookmark list. Do you wish to deregister yourself?'}</p>
      {buttonLabel ? <Button raisedButton label={buttonLabel} onClick={onAccept} /> : (
        <div>
          <Button raisedButton label="Yes" onClick={onAccept} />
          <Button raisedButton primary label="No" onClick={onDecline} />
        </div>
      )}
    </div>
  );
};

Confirm.propTypes = {
  onAccept: PropTypes.func,
  buttonLabel: PropTypes.string,
  confirmText: PropTypes.string,
  onDecline: PropTypes.func
};

export default Confirm;
