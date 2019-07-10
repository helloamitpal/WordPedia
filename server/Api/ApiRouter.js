const router = require('express').Router();
const WordWiring = require('./Word/WordWiring');
const config = require('../util/config');
const logger = require('../util/logger');

router.get(`${config.API_BASE}/getAllWords/`, (req, res) => {
  logger.info('/getAllWords route found');
  WordWiring.WordController().getAllWords(req, res);
});

router.get(`${config.API_BASE}/searchWord/:searchText/:searchType`, (req, res) => {
  logger.info('/searchWord route found');
  WordWiring.WordController().searchWord(req, res);
});

router.post(`${config.API_BASE}/addWord`, (req, res) => {
  logger.info('/addWord route found');
  WordWiring.WordController().addWord(req, res);
});

router.delete(`${config.API_BASE}/deleteWord/:word`, (req, res) => {
  logger.info('/deleteWord route found');
  WordWiring.WordController().deleteWord(req, res);
});

module.exports = router;
