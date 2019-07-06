const logger = require('../../util/logger');
const mockData = require('../../mock-data/wordList.json');
// const WordModel = require('./WordModel');

const getAllWords = () => {
  logger.info('WordService | getAllWords | fetched data successfully');
  return mockData;
};

module.exports = {
  getAllWords
};
