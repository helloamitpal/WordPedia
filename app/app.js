import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { toast } from 'react-toastify';

import Router from './router/Router';
import configureStore from './stores/configureStores';
import EventTracker from './event-tracker';
import Events from './event-tracker/events';
import Features from './util/features';

import './styles/theme.scss';

const MOUNT_NODE = document.getElementById('app');

class App extends React.Component {
  constructor() {
    super();
    const { store } = configureStore()(this.onRehydrate);
    this.installBtnRef = React.createRef();
    this.deferredPrompt = null;
    Features.detect();
    this.state = {
      store,
      rehydrated: false
    };
  }

  componentDidMount() {
    window.addEventListener('beforeinstallprompt', this.installCallback);
    window.addEventListener('online', this.networkListener);
    window.addEventListener('offline', this.networkListener);

    toast.configure({
      draggable: false,
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true
    });

    if (Features.isAppInstalled) {
      toast.success('Welcome to the WordPedia.');
    }
  }

  componentWillUnmount() {
    window.removeEventListener('beforeinstallprompt', this.installCallback);
    window.removeEventListener('online', this.networkListener);
    window.removeEventListener('offline', this.networkListener);
    this.deferredPrompt = null;
  }

  installCallback = (evt) => {
    evt.preventDefault();
    const { current } = this.installBtnRef;
    this.deferredPrompt = evt;
    current.classList.remove('hide');
    current.addEventListener('click', this.addToHomeScreen);
    return false;
  }

  onRehydrate = () => {
    this.setState({ rehydrated: true });
  }

  networkListener = () => {
    const prevNetWorkState = Features.online;
    const isOnLine = navigator.onLine;
    Features.set('online', isOnLine);
    if (prevNetWorkState !== isOnLine) {
      toast.info(isOnLine ? 'You are online again.' : 'Offline! There is not network.', { autoClose: false });
    }
  }

  addToHomeScreen = () => {
    if (this.deferredPrompt) {
      const { current } = this.installBtnRef;
      current.classList.add('hide');

      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then((input) => {
        this.deferredPrompt = null;
        console.log(input);
        if (input === 'accepted') {
          EventTracker.raise(Events.INSTALLED);
        } else {
          EventTracker.raise(Events.INSTALL_REJECTED);
        }
      });
    }
  }

  render() {
    const { store, rehydrated } = this.state;

    const content = rehydrated ? (
      <Provider store={store} key="WordPediaStoreKey">
        <BrowserRouter>
          <Router />
        </BrowserRouter>
        <button type="button" ref={this.installBtnRef} className="ad2hs-prompt hide">Install WordPedia App</button>
      </Provider>
    ) : null;

    return content;
  }
}

const render = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js', { scope: '/' }).then(() => {
      console.log('Service Worker registered successfully.');
    }).catch((error) => {
      console.log('Service Worker registration failed:', error);
    });
  }

  ReactDOM.render(<App />, MOUNT_NODE);
};

render();
