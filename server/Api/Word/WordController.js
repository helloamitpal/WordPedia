const logger = require('../../util/logger');
const WordService = require('./WordService');
const ErrorHandler = require('../../util/errorHandler');

class WordController {
  getAllWords(req, res) {
    logger.info('WordController | getAllWords');
    WordService.getAllWords()
      .then((data) => {
        logger.success(`WordController | getAllWords | sending success response | result count: ${data.length}`);
        res.send(data);
      })
      .catch(() => {
        logger.error('WordController | getAllWords | Sending error response');
        ErrorHandler(500, 'Failed to get all words', res);
      });
  }

  searchWord(req, res) {
    const { searchText, searchType } = req.params;
    logger.info(`WordController | searchWord | Search text: "${searchText}"`);

    if (searchText.trim()) {
      WordService.searchWord(searchText, searchType)
        .then((data) => {
          logger.success(`WordController | searchWord | Sending success response | Search text: "${searchText}"`);
          res.send(data);
        })
        .catch(() => {
          logger.error(`WordController | searchWord | Sending error response | Search text: "${searchText}"`);
          ErrorHandler(500, 'Failed to search given word', res);
        });
    } else {
      this.getAllWords(req, res);
    }
  }

  addWord(req, res) {
    const payload = req.body;

    if (payload) {
      logger.info(`WordController | addWord | word: "${payload.word}"`);
      WordService.addWord(req.body)
        .then((data) => {
          logger.success(`WordController | addWord | Sending success response | word: "${payload.word}"`);
          res.send(data);
        })
        .catch(() => {
          logger.error(`WordController | addWord | Sending error response | word: "${payload.word}"`);
          ErrorHandler(500, 'Failed to add word', res);
        });
    } else {
      logger.error('WordController | addWord | Sending error response because body payload is null');
      ErrorHandler(500, 'Failed to add word', res);
    }
  }

  deleteWord(req, res) {
    logger.info('WordController | deleteWord');
    const { word } = req.params;

    if (word) {
      WordService.deleteWord(word)
        .then((data) => {
          logger.success(`WordController | deleteWord | Sending success response | word: "${word}"`);
          res.send(data);
        })
        .catch(() => {
          logger.error(`WordController | deleteWord | Sending error response | word: "${word}"`);
          ErrorHandler(500, 'Failed to delete word', res);
        });
    } else {
      logger.error('WordController | addWord | Sending error response because invalid word found');
      ErrorHandler(500, 'Failed to delete word', res);
    }
  }
}

module.exports = WordController;
