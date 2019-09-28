const logger = require('../../util/logger');
const UserWiring = require('./UserWiring');

const UserRouter = (router) => {
  logger.info('initialized user router');

  /**
   * @swagger
   * /api/subscribe:
   *    post:
   *        description: Use to log out user from the application
   *        responses:
   *            200:
   *                description: A success response
   */
  router.post('/api/logout', (req, res) => {
    logger.info('/logout route found');
    UserWiring.UserController().logout(req, res);
  });

  /**
   * @swagger
   * /api/register:
   *    post:
   *        description: Use to register user to the application
   *        responses:
   *            200:
   *                description: A success response
   */
  router.post('/api/register', (req, res) => {
    logger.info('/register route found');
    UserWiring.UserController().register(req, res);
  });

  /**
   * @swagger
   * /api/updateUser:
   *    put:
   *        description: Use to update personalized configuration of the logged in user
   *        responses:
   *            200:
   *                description: A success response
   */
  router.put('/api/updateUser', (req, res) => {
    logger.info('/updateUser route found');
    UserWiring.UserController().updateUserSettings(req, res);
  });
};

module.exports = UserRouter;
