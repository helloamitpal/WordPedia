const logger = require('../../util/logger');
const UserModel = require('../User/UserModel');
const Scheduler = require('../../PushNotification/scheduler');

/**
 * [restartNotificationService to resume notification service for those who has opted for]
 * @return {Promise} [returning true or false response]
 */
const restartNotificationService = async () => {
  const users = await UserModel.find({ quiz: true, enabled: true });

  if (users) {
    logger.success(`SubscriptionRouter | restartNotificationService | ${users.length} users found who have registered for quiz`);
    users.forEach(({ userId, subscription }) => {
      if (subscription) {
        Scheduler.start(userId);
        logger.success(`SubscriptionRouter | restartNotificationService | Quiz service has been restarted for the userId ${userId}`);
      }
    });

    return true;
  }

  logger.error('SubscriptionRouter | restartNotificationService | Failed to restart notification service for all registered users');
  return false;
};

/**
 * [subscribeNotification to save the push nottification subscription object to DB]
 * @param  {String}  userId       [user id]
 * @param  {Object String}  subscription [subscription stringified Object]
 * @return {Promise}              [returning error or success response]
 */
const subscribeNotification = async (userId, subscription) => {
  const data = await UserModel.findOne({ userId });

  if (data) {
    data.subscription = subscription;
    const savedData = await data.save();

    if (savedData) {
      logger.success('SubscriptionController | subscribeNotification | User notification subscription is saved successfully');

      return true;
    }

    // in case of any error during save, throwing error
    logger.error('SubscriptionController | subscribeNotification | Failed to save user notification subscription in DB');
    throw new Error();
  }

  // in case of any error, throwing error
  logger.error('SubscriptionController | subscribeNotification | Failed to fetch user in DB for subscribing notification');
  throw new Error();
};

module.exports = {
  restartNotificationService,
  subscribeNotification
};
