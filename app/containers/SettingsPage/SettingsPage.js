import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
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
import Registration from './Registration';

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

  onRegisterCallback = (response) => {
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

  onDeRegisterCallback = () => {
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
            <Registration details={user} onRegister={this.onRegisterCallback} onDeRegister={this.onDeRegisterCallback} />
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
