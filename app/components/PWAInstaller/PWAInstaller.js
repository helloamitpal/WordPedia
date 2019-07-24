import React from 'react';
import { toast } from 'react-toastify';

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
    this.state = {
      deferredPrompt: false
    };
  }

  componentDidMount() {
    window.addEventListener('beforeinstallprompt', this.installCallback);
    window.addEventListener('online', this.networkListener);
    window.addEventListener('offline', this.networkListener);
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
    if (typeof deferredPrompt === 'object' && deferredPrompt.hasOwnProperty('prompt')) {
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
      const message = (isOnLine) ? 'You are online again.' : 'There is no network. Please check!';
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
    return (typeof deferredPrompt === 'object' && (
      <div className="ad2hs-container">
        <div className="logo-text">
          <img src={logo} alt="logo" />
          <div>
            <h2>WordPedia</h2>
            <span>wordpedia.herokuapp.com</span>
          </div>
        </div>
        <Button type="button" className="close-prompt" animation={false} onClick={this.onClose} icon={closeIcon} />
        <button type="button" onClick={this.addToHomeScreen} className="ad2hs-prompt">Add to home screen</button>
      </div>
    ));
  }
}

export default PWAInstaller;
