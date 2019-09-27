import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import ErrorBoundary from './wrapper/errorBoundary';
import Container from './wrapper/container';

import './styles/theme.scss';

const MOUNT_NODE = document.getElementById('app');

const render = () => {
  if ('serviceWorker' in navigator) {
    console.log('Registering service worker');
  } else {
    console.log('Service worker not supported');
  }
  ReactDOM.render(<ErrorBoundary><Container /></ErrorBoundary>, MOUNT_NODE);
};

render();
