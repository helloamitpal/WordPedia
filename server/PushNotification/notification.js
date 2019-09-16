const webpush = require('web-push');

const logger = require('../util/logger');

class Notification {

  static async send(title, body, actions, data) {
    if (!Notification.subscription) {
      logger.error('Notification | Push Notification subscription is not found');
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

    const notify = await webpush.sendNotification(Notification.subscription, payload);

    if (notify) {
      logger.success('Notification | Push Notification is sent successfully');
      return notify;
    }

    logger.error('Notification | Error in sending  Push Notification');
    throw new Error();
  }

  static initializeSubscription(val) {
    logger.success('Notification | notification is successfully subscribed');
    Notification.subscription = val;
  }
}

module.exports = Notification;
