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

class FeaturePage extends React.Component {
  constructor() {
    super();
    this.setComponents();
    this.state = {
      userData: null
    };
  }

  setComponents = () => {
    this.personalizeSections = [{
      icon: bookIcon,
      label: 'Learning mode',
      component: <Toggle onToggle={this.onToggleQuiz} />
    }, {
      icon: langIcon,
      label: 'Default language',
      component: <Select name="language" className="select-box" value={Features.user.language} options={config.LANGUAGES} onChange={this.onChangeLang} />
    }];

    let section;
    if (Features.shareable) {
      section = {
        component: <Button label="Share" icon={shareIcon} onClick={this.shareApp} />
      };
    } else {
      section = {
        icon: shareIcon,
        component: <Input value={window.location.href} readOnly copy onClick={this.copiedLink} />
      };
    }

    this.supportSections = [section, {
      component: <Button label="Feedback" icon={feedbackIcon} onClick={this.sendFeedback} />
    }];

    this.infoSections = [{
      component: <Button label="About WordPedia" onClick={this.toggleAboutMe} />
    }, {
      component: <div>{`Version: ${config.VERSION}`}</div>
    }];
  }

  copiedLink = () => {
    EventTracker.raise(Events.COPIED_APP_LINK);
  }

  responseFacebook = (response) => {
    this.setState({ userData: { ...response } });
  }

  onToggleQuiz = () => {

  }

  toggleAboutMe = () => {

  }

  shareApp = () => {
    navigator.share({
      title: 'WordPedia',
      url: window.location.href
    }).then(() => {
      EventTracker.raise(Events.SHARE_APP);
    }).catch((err) => {
      EventTracker.raise(Events.SHARE_APP_FAILED, err.message);
    });
  }

  sendFeedback = () => {
    window.location.href = `mailto:${config.CONTACT_EMAIL}?subject=${config.CONTACT_EMAIL_TITLE}`;
  }

  onChangeLang = (val) => {
    console.log(val);
  }

  logoutFacebook = () => {
    window.FB.logout();
  }

  getLoginComponent = (userData) => {
    let component;

    if (!userData) {
      component = (
        <React.Fragment>
          <h4>You are not signed in</h4>
          <p>Login to bookmark searched words and improve your vocabulary.</p>
        </React.Fragment>
      );
    } else {
      const { name, email, picture: { data: { url, height, width } } } = userData;

      component = (
        <div className="loggedin-user-details">
          {url && <img src={url} width={width || 50} height={height || 50} alt="user profile" />}
          <div>
            {name && <h4>{name}</h4>}
            {email && <p>{email}</p>}
          </div>
        </div>
      );
    }

    return component;
  }

  render() {
    const { userData } = this.state;

    return (
      <div className="settings-page container">
        <Helmet>
          <title>Settings</title>
          <meta name="description" content="Settings page" />
        </Helmet>
        <Header>
          <h2>Personalize</h2>
          <div className="login-section">
            {this.getLoginComponent(userData)}
            <FacebookLogin
              appId={config.FB_APPID}
              autoLoad={false}
              fields={config.FB_FIELDS}
              callback={this.responseFacebook}
              render={({ isProcessing, isSdkLoaded, onClick }) => (
                userData
                  ? <Button raisedButton label="Logout" icon={fbIcon} onClick={this.logoutFacebook} />
                  : <Button raisedButton isDisabled={isProcessing || !isSdkLoaded} label="Login or Register" icon={fbIcon} onClick={onClick} />
              )}
            />
          </div>
        </Header>
        <div className="setting-page-container body-container">
          <PWAInstaller button />
          <Section title="Personalize" rows={this.personalizeSections} />
          <Section title="Support" rows={this.supportSections} />
          <Section title="Information" rows={this.infoSections} />
        </div>
      </div>
    );
  }
}

export default FeaturePage;
