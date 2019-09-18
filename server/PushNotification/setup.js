/* eslint-disable global-require */

const webpush = require('web-push');

const config = require('../util/config');
const logger = require('../util/logger');

const initialize = () => {
  const { WEB_PUSH_PUBLIC_VAPID_KEY, WEB_PUSH_PRIVATE_VAPID_KEY } = process.env;

  webpush.setVapidDetails(`mailto:${config.CONTACT_EMAIL}`, WEB_PUSH_PUBLIC_VAPID_KEY, WEB_PUSH_PRIVATE_VAPID_KEY);
  logger.info('PushNotification | setup | initialized webpush');
};

module.exports = {
  initialize
};
