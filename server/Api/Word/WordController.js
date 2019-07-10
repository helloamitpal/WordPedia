const logger = require('../../util/logger');
const WordService = require('./WordService');

class WordController {
  constructor() {
    this.word = {
      name: ''
    };
  }

  getAllWords(req, res) {
    logger.info('WordController | getAllWords');
    const data = WordService.getAllWords();
    res.send(data);
  }

  searchWord(req, res) {
    logger.info('WordController | searchWord');
    const { searchText, searchType } = req.params;
    WordService.searchWord(searchText, searchType).then((data) => {
      logger.success('WordController | searchWord | Sending success response');
      res.send(data);
    }, () => {
      logger.error('WordController | searchWord | Sending error response');
      res.status(500).send('Failed to search given word');
    });
  }

  addWord(req, res) {
    logger.info('WordController | addWord');
    WordService.addWord(req.body).then((data) => {
      logger.success('WordController | addWord | Sending success response');
      res.send(data);
    }, () => {
      logger.error('WordController | addWord | Sending error response');
      res.status(500).send('Failed to add word');
    });
  }

  deleteWord(req, res) {
    logger.info('WordController | deleteWord');
    const { word } = req.params;
    WordService.deleteWord(word).then((data) => {
      logger.success('WordController | deleteWord | Sending success response');
      res.send(data);
    }, () => {
      logger.error('WordController | deleteWord | Sending error response');
      res.status(500).send('Failed to delete word');
    });
  }
}

module.exports = WordController;
