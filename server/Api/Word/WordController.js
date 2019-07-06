const logger = require('../../util/logger');
const WordService = require('./WordService');

class WordController {
  constructor() {
    this.word = {
      name: ''
    };
  }

  getAllWords(req, res, offset) {
    logger.info('WordController | getAllWords');
    const data = WordService.getAllWords(offset);
    res.send(data);
  }

  searchWord(req, res, searchText) {
    logger.info('WordController | searchWord');
    const data = WordService.searchWord(searchText);
    res.send(data);
  }
}

module.exports = WordController;
