import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { toast } from 'react-toastify';

import Router from '../router/Router';
import configureStore from '../stores/configureStores';
import Features from '../util/features';
import PWAInstaller from '../components/PWAInstaller';
import config from '../config';
import EventTracker from '../event-tracker';
import { FBinit } from '../components/FBLogin';

class Container extends React.Component {
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
      autoClose: config.TOAST_AUTO_CLOSE_DURATION,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
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

export default Container;
