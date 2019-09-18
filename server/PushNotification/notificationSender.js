const { random } = require('lodash');

const Notification = require('./notification');
const logger = require('../util/logger');
const UserModel = require('../Api/User/UserModel');

class NotificationSender {

  async handler(job, done) {
    const { userId } = job.attrs.data;

    if (userId) {
      const userData = await UserModel.findOne({ userId });

      if (userData) {
        const { words } = userData;
        const randVal = random(0, words.length - 1);
        const word = words[randVal];

        logger.info(`NotificationSender | it is sending "${word}" word response`);

        await Notification.send(userId, word);
        done();
      } else {
        logger.error('NotificationSender| During registration of push notification, the user id is not found');
        throw new Error();
      }
    } else {
      logger.error('NotificationSender | it does not have user id to send notification');
    }
  }
}

module.exports = NotificationSender;
