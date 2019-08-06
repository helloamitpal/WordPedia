import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { FBLogin } from '../../components/FBLogin';
import Confirm from './Confirm';

const Registration = ({ details, onRegister, onDeRegister }) => {
  let component;
  const hasUserDetails = details && details.userId;

  const showConfirmDeregistration = (evt) => {
    toast(<Confirm onAccept={() => onDeRegister(evt)} />, {
      autoClose: false,
      draggable: false,
      hideProgressBar: true,
      closeOnClick: false,
      position: 'bottom-center',
      closeButton: false,
      className: 'confirm-toast-container'
    });
  };

  if (hasUserDetails) {
    const { name, email, profilePicture } = details;

    component = (
      <div className="loggedin-user-details">
        {profilePicture && <img src={profilePicture} width={50} height={50} alt="user profile" />}
        <div>
          {name && <h4>{name}</h4>}
          {email && <p>{email}</p>}
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
      <FBLogin buttonType={hasUserDetails ? 'logout' : 'login'} onLogin={onRegister} onLogout={showConfirmDeregistration} />
    </React.Fragment>
  );
};

Registration.propTypes = {
  details: PropTypes.object.isRequired,
  onRegister: PropTypes.func.isRequired,
  onDeRegister: PropTypes.func.isRequired
};

export default Registration;
