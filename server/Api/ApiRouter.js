const router = require('express').Router();
const UserRouter = require('./User/UserRouter');
const WordRouter = require('./Word/WordRouter');

/* these routes are related to words */
WordRouter(router);

/* these routes are related to user interactions */
UserRouter(router);

module.exports = router;
