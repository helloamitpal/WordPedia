const axios = require('axios');
const logger = require('../../util/logger');
const mockData = require('../../mock-data/wordList.json');
// const WordModel = require('./WordModel');

const synthesizeResponse = (resp) => {
  const arr = resp;
  return arr;
};

const getAllWords = () => {
  logger.success('WordService | getAllWords | all bookmarked words are fetched successfully');
  return mockData;
};

const searchWord = (searchText) => {
  const text = (searchText && decodeURI(searchText).toLowerCase()) || null;
  const bookmarkedWords = mockData.filter(({ word }) => (word.includes(text)));

  if (bookmarkedWords.length === 0) {
    logger.info('WordService | searchWord | searched word is not found in the bookmarked list. Searching on the web is initiated');
    axios.get('https://dog.ceo/api/breeds/list/all').then((data) => {
      logger.success('Error occurred in word search api');
      const webResult = synthesizeResponse(data);
      return {
        bookmarkedWords: [],
        wordsOnWeb: webResult
      };
    }, () => {
      logger.error('Error occurred in word search api');
      return null;
    });
  }

  logger.success('WordService | searchWord | searched word is found in the bookmarked list');
  return {
    bookmarkedWords,
    wordsOnWeb: []
  };
};

module.exports = {
  getAllWords,
  searchWord
};
