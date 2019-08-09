const logger = require('../../util/logger');
const WordService = require('./WordService');
const ErrorHandler = require('../../util/errorHandler');

class WordController {
  getAllWords(req, res) {
    const { userId } = req.params;
    logger.info('WordController | getAllWords');

    if (Number(userId) > 0) {
      WordService.getAllWords(userId)
        .then((data) => {
          logger.success(`WordController | getAllWords | sending success response | result count: ${data.length}`);
          res.send(data);
        })
        .catch(() => {
          logger.error('WordController | getAllWords | Sending error response');
          ErrorHandler(500, 'Failed to get all words', res);
        });
    } else {
      logger.success('WordController | getAllWords | user is not registered. Sending empty response');
      res.send([]);
    }
  }

  searchWord(req, res) {
    const { searchText, searchType, userId } = req.params;
    logger.info(`WordController | searchWord | Search text: "${searchText}"`);

    if (searchText.trim()) {
      const text = (searchText && decodeURI(searchText.trim()).toLowerCase()) || '';
      const service = (searchType === 'bookmark') ? WordService.searchBookmarkedWord(text, userId) : WordService.searchWordDefinitionOnWeb(text);

      service
        .then((data) => {
          logger.success(`WordController | searchWord | Sending success response | Search text: "${text}"`);
          res.send(data);
        })
        .catch(() => {
          logger.error(`WordController | searchWord | Sending error response | Search text: "${text}"`);
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
    const { word, userId } = req.params;

    if (word && userId) {
      WordService.deleteWord(word, userId)
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
