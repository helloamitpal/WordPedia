const router = require('express').Router();
const WordWiring = require('./Word/WordWiring');
const config = require('../util/config');
const logger = require('../util/logger');

router.get(`${config.API_BASE}/getAllWords/:offset`, (req, res) => {
  logger.info('/getAllWords route found');
  WordWiring.WordController().getAllWords(req, res, req.params.offset);
});

router.get(`${config.API_BASE}/searchWord/:searchText`, (req, res) => {
  logger.info('/searchWord route found');
  WordWiring.WordController().searchWord(req, res, req.params.searchText);
});

router.post(`${config.API_BASE}/addWord`, (req, res) => {
  logger.info('/addWord route found');
  WordWiring.WordController().addWord(req, res);
});

module.exports = router;
