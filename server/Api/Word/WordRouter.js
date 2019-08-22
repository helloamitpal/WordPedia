const config = require('../../util/config');
const logger = require('../../util/logger');
const WordWiring = require('./WordWiring');

const WordRouter = (router) => {
  logger.info('initialized word router');

  router.get(`${config.API_BASE}/getAllWords/:userId`, (req, res) => {
    logger.info('/getAllWords route found');
    WordWiring.WordController().getAllWords(req, res);
  });

  router.get(`${config.API_BASE}/searchWord/:searchText/:searchType/:userId`, (req, res) => {
    logger.info('/searchWord route found');
    WordWiring.WordController().searchWord(req, res);
  });

  router.post(`${config.API_BASE}/addWordToCollection/`, (req, res) => {
    logger.info('/addWordToCollection route found');
    WordWiring.WordController().addWord(req, res);
  });

  router.delete(`${config.API_BASE}/deleteWord/:word/:userId`, (req, res) => {
    logger.info('/deleteWord route found');
    WordWiring.WordController().deleteWord(req, res);
  });
};

module.exports = WordRouter;
