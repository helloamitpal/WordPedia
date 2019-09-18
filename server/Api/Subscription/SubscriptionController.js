const logger = require('../../util/logger');
const SubscriptionService = require('./SubscriptionService');
const ErrorHandler = require('../../util/errorHandler');

class SubscriptionController {
  subscribeNotification(req, res) {
    const { userId, subscription } = req.body;

    if (!userId || !subscription) {
      logger.error('SubscriptionController | subscribeNotification | Either userId or subscription or both are invalid.');
      ErrorHandler(500, 'Failed to subscribe notification', res);
    }

    logger.info(`SubscriptionController | subscribeNotification | Push Notification subscription is received for the user: ${userId}`);

    // initializing notification subscription
    SubscriptionService.subscribeNotification(userId, subscription)
      .then(() => {
        logger.success('SubscriptionController | subscribeNotification | sending success response');
        res.status(201).json({});
      })
      .catch(() => {
        logger.error('SubscriptionController | subscribeNotification | Sending error response');
        ErrorHandler(500, 'Failed to subscribe notification', res);
      });
  }
}

module.exports = SubscriptionController;
