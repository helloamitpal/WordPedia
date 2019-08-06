import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import Button from '../Button';
import fbIcon from '../../images/SVG/402-facebook2.svg';

const FBLogin = ({ onLogout, buttonType, onLogin }) => {
  const getLoginDetails = () => {
    window.FB.login((response) => {
      if (response.authResponse) {
        window.FB.api('/me?fields=email,id,name,picture{url}', (resp) => {
          onLogin(resp);
        });
      } else {
        toast.error('Something went wrong. Please try again!');
      }
    }, {
      scope: 'public_profile,email',
      return_scopes: true
    });
  };

  return (
    buttonType === 'login'
      ? <Button raisedButton label="Register" icon={fbIcon} onClick={getLoginDetails} />
      : <Button raisedButton label="Deregister" icon={fbIcon} onClick={onLogout} />
  );
};

FBLogin.propTypes = {
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  buttonType: PropTypes.oneOf(['login', 'logout']).isRequired
};

export default FBLogin;
