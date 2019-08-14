import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';

import './Confirm.scss';

const Confirm = ({ onAccept, onDecline, content }) => {
  return (
    <div className="confirm-container">
      {content || (
        <React.Fragment>
          <p>If you deregister, no new words can be added to bookmark list. Do you wish to deregister yourself?</p>
          <div>
            <Button raisedButton label="Yes" onClick={onAccept} />
            <Button raisedButton label="No" onClick={onDecline} />
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

Confirm.propTypes = {
  onAccept: PropTypes.func,
  content: PropTypes.node,
  onDecline: PropTypes.func
};

export default Confirm;
