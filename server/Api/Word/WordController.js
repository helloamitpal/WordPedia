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

  searchWord(req, res, searchText) {
    logger.info('WordController | searchWord');
    const data = WordService.searchWord(searchText);
    if (data) {
      res.send(data);
    } else {
      res.status(500).send('Failed to search word on the web.');
    }
  }
}

module.exports = WordController;
