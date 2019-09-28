const logger = require('../../util/logger');
const WordWiring = require('./WordWiring');

const WordRouter = (router) => {
  logger.info('initialized word router');

  /**
   * @swagger
   * /api/getAllWords/{userId}:
   *    get:
   *        description: Use to get all saved words against the logged in user id
   *        responses:
   *            200:
   *                description: A success response
   */
  router.get('/api/getAllWords/:userId', (req, res) => {
    logger.info('/getAllWords route found');
    WordWiring.WordController().getAllWords(req, res);
  });

  /**
   * @swagger
   * /api/searchWord/{searchText}/{searchType}/{userId}:
   *    get:
   *        description: Use to search words
   *        responses:
   *            200:
   *                description: A success response
   */
  router.get('/api/searchWord/:searchText/:searchType/:userId', (req, res) => {
    logger.info('/searchWord route found');
    WordWiring.WordController().searchWord(req, res);
  });

  /**
   * @swagger
   * /api/addWordToCollection/:
   *    post:
   *        description: Use to add word to the logged in user's bookmark list
   *        responses:
   *            200:
   *                description: A success response
   */
  router.post('/api/addWordToCollection/', (req, res) => {
    logger.info('/addWordToCollection route found');
    WordWiring.WordController().addWord(req, res);
  });

  /**
   * @swagger
   * /api/deleteWord/{word}/{userId}:
   *    delete:
   *        description: Use to delete saved word of the logged in user
   *        responses:
   *            200:
   *                description: A success response
   */
  router.delete('/api/deleteWord/:word/:userId', (req, res) => {
    logger.info('/deleteWord route found');
    WordWiring.WordController().deleteWord(req, res);
  });
};

module.exports = WordRouter;
