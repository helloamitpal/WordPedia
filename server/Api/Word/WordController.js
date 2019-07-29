const logger = require('../../util/logger');
const WordService = require('./WordService');

class WordController {
  getAllWords(req, res) {
    logger.info('WordController | getAllWords');
    WordService.getAllWords().then((data) => {
      logger.success('WordController | getAllWords | sending success response');
      res.send(data);
    }, () => {
      logger.error('WordController | getAllWords | Sending error response');
      res.status(500).send('Failed to get all words');
    });
  }

  searchWord(req, res) {
    const { searchText, searchType } = req.params;
    logger.info(`WordController | searchWord | ${searchText}`);

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
