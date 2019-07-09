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

  searchWord(req, res, searchText, searchType) {
    logger.info('WordController | searchWord');
    WordService.searchWord(searchText, searchType).then((data) => {
      res.send(data);
    }, () => {
      res.status(500).send('Failed to search word on the web.');
    });
  }
}

module.exports = WordController;
