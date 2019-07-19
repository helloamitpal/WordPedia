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
import * as serviceWorker from './serviceWorker';

import './styles/theme.scss';

const MOUNT_NODE = document.getElementById('app');

class App extends React.Component {
  constructor() {
    super();
    const { store } = configureStore()(this.onRehydrate);
    this.deferredPrompt = null;
    window.addEventListener('beforeinstallprompt', this.installCallback);
    this.state = {
      store,
      rehydrated: false
    };
  }

  componentDidMount() {
    toast.configure({
      draggable: false,
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      containerId: '.app-wrapper'
    });
  }

  componentWillUnmount() {
    window.removeEventListener('beforeinstallprompt', this.installCallback);
    this.deferredPrompt = null;
  }

  installCallback = (evt) => {
    evt.preventDefault();
    this.deferredPrompt = evt;
  }

  onRehydrate = () => {
    this.setState({ rehydrated: true });
  }

  async install() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then((input) => {
        this.deferredPrompt = null;

        if (input === 'accepted') {
          EventTracker.raise(Events.INSTALLED);
          toast.success('WordPedia has been installed successfully.');
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
      </Provider>
    ) : null;

    return content;
  }
}

const render = () => {
  ReactDOM.render(<App />, MOUNT_NODE);
};

Features.detect();
render();
serviceWorker.register();
