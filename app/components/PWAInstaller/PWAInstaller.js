import React from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import EventTracker from '../../event-tracker';
import Events from '../../event-tracker/events';
import Features from '../../util/features';
import Button from '../Button';

import logo from '../../images/logos/WordPedia-512x512.png';
import closeIcon from '../../images/SVG/272-cross.svg';
import './PWAInstaller.scss';

class PWAInstaller extends React.Component {
  constructor() {
    super();
    this.message = {
      online: 'You are online now.',
      offline: 'There is no network. Please check!'
    };
    this.state = {
      deferredPrompt: false
    };
  }

  componentDidMount() {
    window.addEventListener('beforeinstallprompt', this.installCallback);
    window.addEventListener('online', this.networkListener);
    window.addEventListener('offline', this.networkListener);

    if (!navigator.onLine) {
      toast.info(this.message.offline, { toastId: 'network', autoClose: false });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('beforeinstallprompt', this.installCallback);
    window.removeEventListener('online', this.networkListener);
    window.removeEventListener('offline', this.networkListener);
  }

  installCallback = (evt) => {
    evt.preventDefault();
    if (Features.isAppInstalled) {
      return false;
    }
    this.setState({ deferredPrompt: evt });
  }

  addToHomeScreen = () => {
    const { deferredPrompt } = this.state;
    if (typeof deferredPrompt === 'object' && deferredPrompt.prototype.hasOwnProperty('prompt')) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(({ outcome }) => {
        this.setState({ deferredPrompt: false });
        if (outcome === 'accepted') {
          EventTracker.raise(Events.INSTALLED);
        } else {
          EventTracker.raise(Events.INSTALL_REJECTED);
        }
      });
    }
  }

  networkListener = () => {
    const prevNetWorkState = Features.online;
    const isOnLine = navigator.onLine;

    Features.set('online', isOnLine);

    if (prevNetWorkState !== isOnLine) {
      const message = (isOnLine) ? this.message.online : this.message.offline;
      const toastConfig = { autoClose: isOnLine };

      if (toast.isActive('network')) {
        toastConfig.render = message;
        toastConfig.type = toast.TYPE.SUCCESS;
        toast.update('network', toastConfig);
      } else {
        toastConfig.toastId = 'network';
        toast.info(message, toastConfig);
      }
    }
  }

  onClose = () => {
    this.setState({ deferredPrompt: false });
    EventTracker.raise(Events.INSTALL_REJECTED);
  }

  render() {
    const { deferredPrompt } = this.state;
    const { button, className } = this.props;
    let component;

    if ((typeof deferredPrompt === 'object' && button) || (!deferredPrompt && button)) {
      component = (
        <React.Fragment>
          <Button disabled={!deferredPrompt} onClick={this.addToHomeScreen} raisedButton className="ad2hs-prompt" label="Add to home screen" />
          <div className="added-pwa-message">It has already been added</div>
        </React.Fragment>
      );
    } else if (typeof deferredPrompt === 'object' && !button) {
      component = (
        <React.Fragment>
          <div className="logo-text">
            <img src={logo} alt="logo" />
            <div>
              <h2>WordPedia</h2>
              <span>wordpedia.herokuapp.com</span>
            </div>
          </div>
          <Button className="close-prompt" animation={false} onClick={this.onClose} icon={closeIcon} />
          <Button onClick={this.addToHomeScreen} raisedButton className="ad2hs-prompt" label="Add to home screen" />
        </React.Fragment>
      );
    }

    return <div className={`ad2hs-container ${className} ${button ? '' : 'popup'}`}>{component}</div>;
  }
}

PWAInstaller.defaultProps = {
  button: false,
  className: ''
};

PWAInstaller.propTypes = {
  button: PropTypes.bool,
  className: PropTypes.string
};

export default PWAInstaller;
