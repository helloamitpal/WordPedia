const logger = require('../../util/logger');
const SubscriptionWiring = require('./SubscriptionWiring');
const SubscriptionService = require('./SubscriptionService');

const SubscriptionRouter = (router) => {
  logger.info('initialized subscription router');
  SubscriptionService.restartNotificationService();

  /**
   * @swagger
   * /api/subscribe:
   *    post:
   *        description: Use to subscribe quiz notification for the logged in user
   *        responses:
   *            200:
   *                description: A success response
   */
  router.post('/api/subscribe', (req, res) => {
    logger.info('/subscribe route found');
    SubscriptionWiring.SubscriptionController().subscribeNotification(req, res);
  });
};

module.exports = SubscriptionRouter;
