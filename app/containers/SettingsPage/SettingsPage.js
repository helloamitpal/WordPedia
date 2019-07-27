import React from 'react';
import { Helmet } from 'react-helmet';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import Select from 'react-select';

import Header from '../../components/Header';
import Button from '../../components/Button';
import Toggle from '../../components/Toggle';
import PWAInstaller from '../../components/PWAInstaller';
import Section from '../../components/Section';
import config from '../../config';
import Features from '../../util/features';
import EventTracker from '../../event-tracker';
import Events from '../../event-tracker/events';
import Input from '../../components/Input';

import fbIcon from '../../images/SVG/402-facebook2.svg';
import shareIcon from '../../images/SVG/387-share2.svg';
import feedbackIcon from '../../images/SVG/390-mail3.svg';
import bookIcon from '../../images/SVG/032-book.svg';
import langIcon from '../../images/SVG/275-spell-check.svg';

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
    navigator.share({
      title: 'WordPedia',
      url: window.location.href
    }).then(() => {
      EventTracker.raise(Events.SHARE_APP);
    }).catch((err) => {
      EventTracker.raise(Events.SHARE_APP_FAILED, err.message);
    });
  };

  const sendFeedback = () => {
    window.location.href = `mailto:${config.CONTACT_EMAIL}?subject=${config.CONTACT_EMAIL_TITLE}`;
  };

  const onChangeLang = (val) => {

  };

  const personalizeSections = [{
    icon: bookIcon,
    label: 'Learning mode',
    component: <Toggle onToggle={onToggleQuiz} />
  }, {
    icon: langIcon,
    label: 'Default language',
    component: <Select name="language" className="select-box" value={Features.user.language} options={config.LANGUAGES} onChange={onChangeLang} />
  }];

  const copiedLink = () => {
    EventTracker.raise(Events.COPIED_APP_LINK);
  };

  let section;
  if (Features.shareable) {
    section = {
      component: <Button label="Share" icon={shareIcon} onClick={shareApp} />
    };
  } else {
    section = {
      icon: shareIcon,
      component: <Input value={window.location.href} readOnly copy onClick={copiedLink} />
    };
  }

  const supportSections = [section, {
    component: <Button label="Feedback" icon={feedbackIcon} onClick={sendFeedback} />
  }];

  const infoSections = [{
    component: <Button label="About WordPedia" onClick={toggleAboutMe} />
  }, {
    component: <div>{`Version: ${config.VERSION}`}</div>
  }];

  return (
    <div className="settings-page container">
      <Helmet>
        <title>Settings</title>
        <meta name="description" content="Settings page" />
      </Helmet>
      <Header>
        <h2>Personalize</h2>
        <div className="login-section">
          <h4>You are not signed in</h4>
          <p>Login to bookmark searched words and improve your vocabulary.</p>
          <FacebookLogin
            appId={config.FB_APPID}
            autoLoad={false}
            fields={config.FB_FIELDS}
            callback={responseFacebook}
            render={({ isProcessing, isSdkLoaded, onClick }) => (
              <Button raisedButton isDisabled={isProcessing || !isSdkLoaded} label="Login or Register" icon={fbIcon} onClick={onClick} />
            )}
          />
        </div>
      </Header>
      <div className="setting-page-container body-container">
        <PWAInstaller button />
        <Section title="Personalize" rows={personalizeSections} />
        <Section title="Support" rows={supportSections} />
        <Section title="Information" rows={infoSections} />
      </div>
    </div>
  );
};

export default FeaturePage;
