const router = require('express').Router();
const UserRouter = require('./User/UserRouter');
const WordRouter = require('./Word/WordRouter');
const SubscriptionRouter = require('./Subscription/SubscriptionRouter');

/* routes related to words */
WordRouter(router);

/* routes related to user interactions */
UserRouter(router);

/* routes related to subscription */
SubscriptionRouter(router);

module.exports = router;
