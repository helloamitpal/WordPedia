import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';

import './Confirm.scss';

const Registration = ({ onAccept, onDecline }) => {
  return (
    <div className="confirm-container">
      <p>If you deregister, no new words can be added to bookmark list. Do you wish to deregister yourself?</p>
      <div>
        <Button raisedButton label="Yes" onClick={onAccept} />
        <Button raisedButton label="No" onClick={onDecline} />
      </div>
    </div>
  );
};

Registration.propTypes = {
  onAccept: PropTypes.func.isRequired,
  onDecline: PropTypes.func
};

export default Registration;
