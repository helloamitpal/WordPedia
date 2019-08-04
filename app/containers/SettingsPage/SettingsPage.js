import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import Select from 'react-select';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userActionCreator from '../HomePage/userActionCreator';
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

class SettingsPage extends React.Component {
  constructor() {
    super();
    this.state = {
      quiz: false,
      showAboutMe: false,
      language: {
        key: 'en',
        label: 'English'
      }
    };
    this.shareLink = window.location.origin;
  }

  copiedLink = () => {
    EventTracker.raise(Events.COPIED_APP_LINK);
  }

  onFacebookLoginCallback = (response) => {
    const { userActions } = this.props;
    const { quiz, language } = this.state;
    const { userID, name, email, picture: { data: { url } } } = response;

    EventTracker.raise(Events.USER_REGISTRATION);
    userActions.registerUser({
      userId: userID,
      profilePicture: url,
      email,
      name,
      quiz,
      language: language.value
    });
  }

  logoutFacebook = () => {
    const { userActions, userState: { user } } = this.props;
    EventTracker.raise(Events.USER_LOG_OUT);
    userActions.logoutUser(user);
  }

  onChangeLang = (val) => {
    const { userActions, userState: { user } } = this.props;

    user.language = val.key;
    this.setState({ language: val });

    EventTracker.raise(Events.CHANGE_LANGUAGE);
    userActions.updateUser(user);
  }

  onToggleQuiz = () => {
    const { quiz } = this.state;
    const { userActions, userState: { user } } = this.props;

    user.quiz = !quiz;
    this.setState({ quiz: !quiz });

    EventTracker.raise(Events.TOGGLE_QUIZ_MODE);
    userActions.updateUser(user);
  }

  toggleAboutMe = () => {
    const { showAboutMe } = this.state;
    this.setState({ showAboutMe: !showAboutMe });
  }

  shareApp = () => {
    navigator.share({
      title: 'WordPedia',
      url: this.shareLink
    }).then(() => {
      EventTracker.raise(Events.SHARE_APP);
    }).catch((err) => {
      EventTracker.raise(Events.SHARE_APP_FAILED, err.message);
    });
  }

  sendFeedback = () => {
    window.location.href = `mailto:${config.CONTACT_EMAIL}?subject=${config.CONTACT_EMAIL_TITLE}`;
  }

  getLoginComponent = (userState) => {
    let component;

    if (!userState || (userState && !userState.userId)) {
      component = (
        <React.Fragment>
          <h4>You are not signed in</h4>
          <p>Login to bookmark searched words and improve your vocabulary.</p>
        </React.Fragment>
      );
    } else {
      const { name, email, profilePicture } = userState;

      component = (
        <React.Fragment>
          <div className="loggedin-user-details">
            {profilePicture && <img src={profilePicture} width={50} height={50} alt="user profile" />}
            <div>
              {name && <h4>{name}</h4>}
              {email && <p>{email}</p>}
            </div>
          </div>
          <Button raisedButton label="Logout" icon={fbIcon} onClick={this.logoutFacebook} />
        </React.Fragment>
      );
    }

    return component;
  }

  getPersonalizeSections = () => {
    const { language } = this.state;

    return [{
      icon: bookIcon,
      label: 'Learning mode',
      component: <Toggle onToggle={this.onToggleQuiz} />
    }, {
      icon: langIcon,
      label: 'Default language',
      component: <Select name="language" className="select-box" value={language} options={config.LANGUAGES} onChange={this.onChangeLang} />
    }];
  }

  getSupportSections = () => {
    let section;

    if (Features.shareable) {
      section = {
        component: <Button label="Share" icon={shareIcon} onClick={this.shareApp} />
      };
    } else {
      section = {
        icon: shareIcon,
        component: <Input type="copy" value={this.shareLink} readOnly onClick={this.copiedLink} />
      };
    }

    return [section, {
      icon: feedbackIcon,
      component: <Button label="Feedback" className="feedback-btn" onClick={this.sendFeedback} />
    }];
  }

  getInfoSections = () => {
    const { showAboutMe } = this.state;

    return [{
      component: (
        <div className="aboume-me-container">
          <Button label="About WordPedia" onClick={this.toggleAboutMe} />
          {showAboutMe && (
            <p>WordPedia helps to improve the vocabulary and learn new words and storing them and learn by quiz. For more details drop a mail to Feedback email hellowordpedia@gmail.com</p>
          )}
        </div>
      )
    }, {
      component: <div>{`Version: ${config.VERSION}`}</div>
    }];
  }

  render() {
    const { userState: { user } } = this.props;

    return (
      <div className="settings-page container">
        <Helmet>
          <title>Settings</title>
          <meta name="description" content="Settings page" />
        </Helmet>
        <Header>
          <h2>Personalize</h2>
          <div className="login-section">
            {this.getLoginComponent(user)}
            {(!user || (user && !user.userId)) && (
              <FacebookLogin
                appId={config.FB_APPID}
                autoLoad={false}
                fields={config.FB_FIELDS}
                callback={this.onFacebookLoginCallback}
                render={({ isProcessing, isSdkLoaded, onClick }) => (
                  <Button raisedButton isDisabled={isProcessing || !isSdkLoaded} label="Login or Register" icon={fbIcon} onClick={onClick} />
                )}
              />
            )}
          </div>
        </Header>
        <div className="setting-page-container body-container">
          <PWAInstaller button />
          <Section title="Personalize" rows={this.getPersonalizeSections()} />
          <Section title="Support" rows={this.getSupportSections()} />
          <Section title="Information" rows={this.getInfoSections()} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userActions: bindActionCreators(userActionCreator, dispatch)
});

const mapStateToProps = (state) => ({
  userState: state.user
});

SettingsPage.propTypes = {
  userState: PropTypes.object,
  userActions: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
