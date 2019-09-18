const logger = require('../../util/logger');
const config = require('../../util/config');
const SubscriptionWiring = require('./SubscriptionWiring');
const SubscriptionService = require('./SubscriptionService');

const SubscriptionRouter = (router) => {
  logger.info('initialized subscription router');
  SubscriptionService.restartNotificationService();

  router.post(`${config.API_BASE}/subscribe`, (req, res) => {
    logger.info('/subscribe route found');
    SubscriptionWiring.SubscriptionController().subscribeNotification(req, res);
  });
};

module.exports = SubscriptionRouter;
