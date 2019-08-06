import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../components/Button';

const Registration = ({ onAccept, closeToast }) => {
  return (
    <div className="confirm-container">
      <p>If you deregister, no new words can be added to bookmark list. Do you wish to deregister yourself?</p>
      <div>
        <Button raisedButton label="Yes" onClick={onAccept} />
        <Button raisedButton label="No" onClick={closeToast} />
      </div>
    </div>
  );
};

Registration.propTypes = {
  onAccept: PropTypes.func.isRequired,
  closeToast: PropTypes.func
};

export default Registration;
