import React from 'react';
import { toast } from 'react-toastify';

import EventTracker from '../../event-tracker';
import Events from '../../event-tracker/events';
import Features from '../../util/features';

import './PWAInstaller.scss';

class PWAInstaller extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false
    };
    this.deferredPrompt = null;
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
    this.deferredPrompt = evt;
    if (Features.isAppInstalled) {
      return false;
    }
    this.setState({ show: true });
    return false;
  }

  addToHomeScreen = () => {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then((input) => {
        this.deferredPrompt = null;
        this.setState({ show: false });
        console.log(input);
        if (input === 'accepted') {
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
      toast.info(isOnLine ? 'You are online again.' : 'Offline! There is not network.', { autoClose: false });
    }
  }

  render() {
    const { show } = this.state;
    return (show && <button type="button" onClick={this.addToHomeScreen} className="ad2hs-prompt hide">Install WordPedia App</button>);
  }
}

export default PWAInstaller;
