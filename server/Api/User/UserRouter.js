const config = require('../../util/config');
const logger = require('../../util/logger');
const UserWiring = require('./UserWiring');

const UserRouter = (router) => {
  logger.info('initialized user router');

  router.post(`${config.API_BASE}/logout`, (req, res) => {
    logger.info('/logout route found');
    UserWiring.UserController().logout(req, res);
  });

  router.post(`${config.API_BASE}/register`, (req, res) => {
    logger.info('/register route found');
    UserWiring.UserController().register(req, res);
  });

  router.put(`${config.API_BASE}/updateUser`, (req, res) => {
    logger.info('/updateUser route found');
    UserWiring.UserController().updateUserSettings(req, res);
  });
};

module.exports = UserRouter;
