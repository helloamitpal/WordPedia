const router = require('express').Router();
const WordWiring = require('./Word/WordWiring');
const AuthWiring = require('./Auth/AuthWiring');
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

router.post(`${config.API_BASE}/addWordToCollection/`, (req, res) => {
  logger.info('/addWordToCollection route found');
  WordWiring.WordController().addWord(req, res);
});

router.delete(`${config.API_BASE}/deleteWord/:word`, (req, res) => {
  logger.info('/deleteWord route found');
  WordWiring.WordController().deleteWord(req, res);
});

router.get(`${config.API_BASE}/auth/success`, (req, res) => {
  logger.info('/auth/success route found');
  AuthWiring.AuthController().success(req, res);
});

router.get(`${config.API_BASE}/auth/error`, (req, res) => {
  logger.info('/auth/error route found');
  AuthWiring.AuthController().error(req, res);
});

module.exports = router;
