const router = require('express').Router();
const WordWiring = require('./Word/WordWiring');
const UserWiring = require('./User/UserWiring');
const config = require('../util/config');
const logger = require('../util/logger');

/* route related to words */
router.get(`${config.API_BASE}/getAllWords/`, (req, res) => {
  logger.info('/getAllWords route found');
  WordWiring.WordController().getAllWords(req, res);
});

router.get(`${config.API_BASE}/searchWord/:searchText/:searchType`, (req, res) => {
  logger.info('/searchWord route found');
  WordWiring.WordController().searchWord(req, res);
});

router.post(`${config.API_BASE}/addWordToCollection/`, (req, res) => {
  logger.info('/addWordToCollection route found');
  WordWiring.WordController().addWord(req, res);
});

router.delete(`${config.API_BASE}/deleteWord/:word`, (req, res) => {
  logger.info('/deleteWord route found');
  WordWiring.WordController().deleteWord(req, res);
});

/* route related to user authentication */
router.post(`${config.API_BASE}/logout`, (req, res) => {
  logger.info('/logout route found');
  UserWiring.UserController().logout(req, res);
});

router.post(`${config.API_BASE}/register`, (req, res) => {
  logger.info('/register route found');
  UserWiring.UserController().register(req, res);
});

module.exports = router;
