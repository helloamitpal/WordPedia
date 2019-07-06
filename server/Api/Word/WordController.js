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
}

module.exports = WordController;
