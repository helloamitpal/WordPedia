const webpush = require('web-push');

const logger = require('../util/logger');
const UserModel = require('../Api/User/UserModel');

class Notification {

  static async send(userId, title, body, actions, data) {
    let subscriptionObj;
    const userData = await UserModel.findOne({ userId });
    try {
      if (userData && userData.subscription) {
        subscriptionObj = JSON.parse(userData.subscription);
        logger.success(`Notification | notification subscription received for the user ${userId}`);
      } else {
        return null;
      }
    } catch (err) {
      logger.error('Notification | Error in Push Notification subscription');
      return null;
    }

    const payload = JSON.stringify({
      title,
      body: body || 'Do you remember the meaning?',
      data: data || {
        forget: {
          title,
          body: 'Search this word and try to momorize.'
        },
        remember: {
          title,
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

    const notify = await webpush.sendNotification(subscriptionObj, payload);

    if (notify) {
      logger.success('Notification | Push Notification is sent successfully');
      return notify;
    }

    logger.error('Notification | Error in sending Push Notification');
    return false;
  }
}

module.exports = Notification;
