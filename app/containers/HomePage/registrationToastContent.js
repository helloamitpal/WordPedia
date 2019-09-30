import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../components/Button';

const RegistrationToastContent = ({ onClick }) => (
  <div>
    <span>Please register yourself to add this word. For registration</span>
    <Button className="registration-btn" primary riasedButton label="Click here" onClick={onClick} />
  </div>
);

RegistrationToastContent.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default RegistrationToastContent;
