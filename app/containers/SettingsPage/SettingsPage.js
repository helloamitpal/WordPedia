import React from 'react';
import { Helmet } from 'react-helmet';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

import Header from '../../components/Header';
import Button from '../../components/Button';
import Toggle from '../../components/Toggle';
import PWAInstaller from '../../components/PWAInstaller';
import config from '../../config';

import fbIcon from '../../images/SVG/402-facebook2.svg';
import shareIcon from '../../images/SVG/387-share2.svg';
import feedbackIcon from '../../images/SVG/390-mail3.svg';

import './SettingsPage.scss';

const FeaturePage = () => {

  const responseFacebook = (response) => {
    console.log(response);
  };

  const onToggleQuiz = () => {

  };

  const toggleAboutMe = () => {

  };

  const shareApp = () => {

  };

  const sendFeedback = () => {

  };

  return (
    <div className="settings-page">
      <Helmet>
        <title>Settings</title>
        <meta name="description" content="Settings page" />
      </Helmet>
      <Header>
        <h2>Personalize</h2>
      </Header>
      <div className="setting-page-container body-container">
        <FacebookLogin
          appId={config.FB_APPID}
          autoLoad={false}
          fields={config.FB_FIELDS}
          callback={responseFacebook}
          render={({ isProcessing, isSdkLoaded, onClick }) => (
            <Button raisedButton isDisabled={isProcessing || !isSdkLoaded} label="Connect" icon={fbIcon} onClick={onClick} />
          )}
        />
        <Toggle label="Learning mode" onToggle={onToggleQuiz} />
        <PWAInstaller />
        <select>
          <option>Default language</option>
        </select>
        <Button raisedButton label="Share" icon={shareIcon} onClick={shareApp} />
        <Button raisedButton label="Feedback" icon={feedbackIcon} onClick={sendFeedback} />
        <Button raisedButton label="About WordPedia" onClick={toggleAboutMe} />
        <div>{`Version: ${config.VERSION}`}</div>
      </div>
    </div>
  );
};

export default FeaturePage;
