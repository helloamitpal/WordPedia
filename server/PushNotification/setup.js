const webpush = require('web-push');

const config = require('../util/config');
const logger = require('../util/logger');
const Notification = require('./notification');

module.exports = (app) => {
  const publicVapidKey = process.env.WEB_PUSH_PUBLIC_VAPID_KEY;
  const privateVapidKey = process.env.WEB_PUSH_PRIVATE_VAPID_KEY;

  webpush.setVapidDetails(`mailto:${config.CONTACT_EMAIL}`, publicVapidKey, privateVapidKey);

  app.post('/subscribe', (req, res) => {
    const subscription = req.body;
    logger.info('Setup | Push Notification is sent for subscription');

    // initializing notification subscription
    Notification.initializeSubscription(subscription);

    // returning the response back
    res.status(201).json({});
  });
};
