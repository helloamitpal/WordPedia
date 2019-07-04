import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import FontFaceObserver from 'fontfaceobserver';
import { Provider } from 'react-redux';

import Router from './router/Router';
import configureStore from './stores/configureStores';

import 'sanitize.css/sanitize.css';
import './styles/theme.scss';

const MOUNT_NODE = document.getElementById('app');

class App extends React.Component {
  constructor() {
    super();
    const { store } = configureStore()(this.onRehydrate);
    const openSansObserver = new FontFaceObserver('Open Sans', {});
    this.state = {
      store,
      rehydrated: false
    };

    openSansObserver.load().then(() => {
      document.body.classList.add('fontLoaded');
    }, () => {
      document.body.classList.remove('fontLoaded');
    });
  }

  onRehydrate = () => {
    this.setState({ rehydrated: true });
  }

  render() {
    const { store, rehydrated } = this.state;

    const content = rehydrated ? (
      <Provider store={store} key="learnNewWordStoreKey">
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

render();
