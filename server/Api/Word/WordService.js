const logger = require('../../util/logger');
const mockData = require('../../mock-data/wordList.json');
// const WordModel = require('./WordModel');

const getAllWords = (offset) => {
  logger.info('WordService | getAllWords | fetched data successfully');
  return offset >= 0 ? mockData.slice(10 * offset, 10 * offset + 10) : mockData;
};

const searchWord = (searchText) => {
  const text = (searchText && decodeURI(searchText).toLowerCase()) || null;
  logger.info('WordService | searchWord | searched data successfully');
  return mockData.filter(({ word }) => (word.includes(text)));
};

module.exports = {
  getAllWords,
  searchWord
};
