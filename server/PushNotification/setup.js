const webpush = require('web-push');

const logger = require('../util/logger');
const config = require('../util/config');

class PushNotification {
  static sendNotification(title, body, actions, data) {
    if (!PushNotification.subscription) {
      logger.error('Notification subscription is not found');
      return;
    }
    const payload = JSON.stringify({
      title,
      body: body || 'Do you remember the meaning?',
      data: data || {
        forget: {
          title: 'Sprint',
          body: 'Search this word and try to momorize.'
        },
        remember: {
          title: 'Sprint',
          body: 'Well done! Good going.'
        }
      },
      actions: actions || [{
        action: 'forget',
        title: 'Forget'
      }, {
        action: 'remember',
        title: 'Remember'
      }]
    });

    webpush.sendNotification(PushNotification.subscription, payload)
      .then((resp) => {
        logger.success('Notification is sent successfully', resp);
      })
      .catch((error) => {
        logger.error('Error in sending  Notification', error.stack);
      });
  }

  static setup(app) {
    const publicVapidKey = process.env.WEB_PUSH_PUBLIC_VAPID_KEY;
    const privateVapidKey = process.env.WEB_PUSH_PRIVATE_VAPID_KEY;

    webpush.setVapidDetails(`mailto:${config.CONTACT_EMAIL}`, publicVapidKey, privateVapidKey);

    app.post('/subscribe', (req, res) => {
      const subscription = req.body;
      PushNotification.subscription = subscription;
      logger.info('Notification subscribed');
      res.status(201).json({});
    });
  }
}

module.exports = PushNotification;
