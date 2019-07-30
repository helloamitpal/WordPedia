const logger = require('../../util/logger');
const WordService = require('./WordService');

class WordController {
  getAllWords(req, res) {
    logger.info('WordController | getAllWords');
    WordService.getAllWords().then((data) => {
      logger.success(`WordController | getAllWords | sending success response | result count: ${data.length}`);
      res.send(data);
    }, () => {
      logger.error('WordController | getAllWords | Sending error response');
      res.status(500).send('Failed to get all words');
    });
  }

  searchWord(req, res) {
    const { searchText, searchType } = req.params;
    logger.info(`WordController | searchWord | Search text: "${searchText}"`);

    if (searchText.trim()) {
      WordService.searchWord(searchText, searchType).then((data) => {
        logger.success(`WordController | searchWord | Sending success response | Search text: "${searchText}"`);
        res.send(data);
      }, () => {
        logger.error(`WordController | searchWord | Sending error response | Search text: "${searchText}"`);
        res.status(500).send('Failed to search given word');
      });
    } else {
      this.getAllWords(req, res);
    }
  }

  addWord(req, res) {
    const payload = req.body;

    if (payload) {
      logger.info(`WordController | addWord | word: "${payload.word}"`);
      WordService.addWord(req.body).then((data) => {
        logger.success(`WordController | addWord | Sending success response | word: "${payload.word}"`);
        res.send(data);
      }, () => {
        logger.error(`WordController | addWord | Sending error response | word: "${payload.word}"`);
        res.status(500).send('Failed to add word');
      });
    } else {
      logger.error('WordController | addWord | Sending error response because body payload is null');
      res.status(500).send('Failed to add word');
    }
  }

  deleteWord(req, res) {
    logger.info('WordController | deleteWord');
    const { word } = req.params;

    if (word) {
      WordService.deleteWord(word).then((data) => {
        logger.success(`WordController | deleteWord | Sending success response | word: "${word}"`);
        res.send(data);
      }, () => {
        logger.error(`WordController | deleteWord | Sending error response | word: "${word}"`);
        res.status(500).send('Failed to delete word');
      });
    } else {
      logger.error('WordController | addWord | Sending error response because invalid word found');
      res.status(500).send('Failed to delete word');
    }
  }
}

module.exports = WordController;
