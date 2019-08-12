const webpush = require('web-push');
const logger = require('../util/logger');
const config = require('../util/config');

const setup = (app) => {
  const publicVapidKey = process.env.WEB_PUSH_PUBLIC_VAPID_KEY;
  const privateVapidKey = process.env.WEB_PUSH_PRIVATE_VAPID_KEY;

  webpush.setVapidDetails(`mailto:${config.CONTACT_EMAIL}`, publicVapidKey, privateVapidKey);

  app.post('/subscribe', (req, res) => {
    const subscription = req.body;
    res.status(201).json({});
    const payload = JSON.stringify({
      title: 'Quiz time',
      body: 'Do you remember the meaning of \'Sprint\'?',
      data: {
        forget: {
          title: 'Quiz time',
          body: 'Search this word and try to momorize.'
        },
        remember: {
          title: 'Quiz time',
          body: 'Well done! Good going.'
        }
      },
      actions: [{
        action: 'forget',
        title: 'Forget'
      }, {
        action: 'remember',
        title: 'Remember'
      }]
    });

    logger.info('Notification subscribed', subscription);

    webpush.sendNotification(subscription, payload)
      .then((resp) => {
        logger.success('Notification is sent successfully', resp);
      })
      .catch((error) => {
        logger.error('Error in sending  Notification', error.stack);
      });
  });
};

module.exports = {
  setup
};
