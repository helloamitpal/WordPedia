import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { toast } from 'react-toastify';

import Router from './router/Router';
import configureStore from './stores/configureStores';
import Features from './util/features';
import PWAInstaller from './components/PWAInstaller';
import EventTracker from './event-tracker';
import { FBinit } from './components/FBLogin';

import './styles/theme.scss';

const MOUNT_NODE = document.getElementById('app');

class App extends React.Component {
  constructor() {
    super();
    const { store } = configureStore()(this.onRehydrate);
    Features.detect();
    this.state = {
      store,
      rehydrated: false
    };
  }

  componentDidMount() {
    EventTracker.init();
    FBinit();
    toast.configure({
      draggable: false,
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      position: (Features.isMobile ? 'bottom-right' : 'top-right')
    });
  }

  onRehydrate = () => {
    this.setState({ rehydrated: true });
  }

  render() {
    const { store, rehydrated } = this.state;

    const content = rehydrated ? (
      <React.Fragment>
        <Provider store={store} key="WordPediaStoreKey">
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </Provider>
        <PWAInstaller />
      </React.Fragment>
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
