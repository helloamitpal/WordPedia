import React from 'react';
import PropTypes from 'prop-types';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

import config from '../../config';
import Button from '../../components/Button';
import fbIcon from '../../images/SVG/402-facebook2.svg';

const Registration = ({ details, onRegister, onDeRegister }) => {
  let component;

  if (details && details.userId) {
    const { name, email, profilePicture } = details;

    component = (
      <React.Fragment>
        <div className="loggedin-user-details">
          {profilePicture && <img src={profilePicture} width={50} height={50} alt="user profile" />}
          <div>
            {name && <h4>{name}</h4>}
            {email && <p>{email}</p>}
          </div>
        </div>
        <Button raisedButton label="Deregister" icon={fbIcon} onClick={onDeRegister} />
      </React.Fragment>
    );
  } else {
    component = (
      <React.Fragment>
        <h4>You are not registered</h4>
        <p>Please register to bookmark words and improve vocabulary.</p>
        <FacebookLogin
          appId={config.FB_APPID}
          autoLoad={false}
          fields={config.FB_FIELDS}
          callback={onRegister}
          render={({ isProcessing, isSdkLoaded, onClick }) => (
            <Button raisedButton isDisabled={isProcessing || !isSdkLoaded} label="Register" icon={fbIcon} onClick={onClick} />
          )}
        />
      </React.Fragment>
    );
  }

  return component;
};

Registration.propTypes = {
  details: PropTypes.object.isRequired,
  onRegister: PropTypes.func.isRequired,
  onDeRegister: PropTypes.func.isRequired
};

export default Registration;
