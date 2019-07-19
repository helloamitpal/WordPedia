import Features from './util/features';

const register = () => {
  if (Features.serviceWorker && !navigator.serviceWorker.controller) {
    // navigator.serviceWorker.register('pwaBuilder-sw.js', {
    //   scope: './'
    // });
  }
};

const unregister = () => {

};

export { register, unregister };
