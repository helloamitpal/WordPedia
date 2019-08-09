import React from 'react';
import PropTypes from 'prop-types';

import { FBLogin } from '../../components/FBLogin';
import ProfilePic from '../../components/ProfilePic';
import { askConfirmation } from '../../components/Confirm';

const Registration = ({ details, onRegister, onDeRegister, disabled }) => {
  let component;
  const hasUserDetails = details && details.userId;

  const showConfirmDeregistration = (evt) => {
    askConfirmation()
      .then(() => onDeRegister(evt))
      .catch(() => console.log('Not confirmed'));
  };

  if (hasUserDetails) {
    const { name, email, profilePicture, wordCount } = details;

    component = (
      <div className="loggedin-user-details">
        <ProfilePic path={profilePicture} width={50} height={50} />
        <div>
          {name && <h4>{name}</h4>}
          {email && <p>{email}</p>}
          {wordCount >= 0 && <p>{`${wordCount} Bookmarked words`}</p>}
        </div>
      </div>
    );
  } else {
    component = (
      <React.Fragment>
        <h4>You are not registered</h4>
        <p>Please register to bookmark words and improve vocabulary.</p>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      {component}
      <FBLogin disabled={disabled} buttonType={hasUserDetails ? 'logout' : 'login'} onLogin={onRegister} onLogout={showConfirmDeregistration} />
    </React.Fragment>
  );
};

Registration.defaultProps = {
  disabled: false
};

Registration.propTypes = {
  details: PropTypes.object.isRequired,
  onRegister: PropTypes.func.isRequired,
  onDeRegister: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

export default Registration;
