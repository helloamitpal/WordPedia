const axios = require('axios');
const logger = require('../../util/logger');
const mockData = require('../../mock-data/wordList.json');
const WordModel = require('./WordModel');
const helper = require('../../util/helper');

const synthesizeWordSuggestions = (resp) => {
  const arr = [];
  resp.forEach(({ defs, score, word }) => {
    if (defs && defs.length && parseInt(score, 10) >= 1000) {
      arr.push(new WordModel({
        word,
        shortDefinitions: helper.replaceChars(defs, '\t')
      }));
    }
  });
  return arr;
};

const synthesizeWordDefinition = (resp) => {
  const origins = [];
  const shortDefinitions = [];
  const longDefinitions = [];

  resp.forEach((respObj) => {
    if (respObj.origins) {
      origins.push(respObj.origins);
    }

    Object.entries(respObj.meaning).forEach((meaning) => {
      if (meaning[1] && meaning[1].length) {
        meaning[1].forEach((defObj) => {
          shortDefinitions.push(defObj.definition);
        });
      }
      longDefinitions.push({
        type: meaning[0],
        examples: meaning[1] || []
      });
    });
  });

  return new WordModel({
    word: resp[0].word,
    phonetic: resp[0].phonetic,
    origins,
    shortDefinitions,
    longDefinitions
  });
};

const getAllWords = () => {
  logger.success('WordService | getAllWords | all bookmarked words are fetched successfully');
  return mockData;
};

const searchWord = (searchText, searchType) => (new Promise((resolve, reject) => {
  const text = (searchText && decodeURI(searchText).toLowerCase()) || null;

  if (searchType === 'bookmark') {
    const bookmarkedWords = mockData.filter(({ word }) => (word.includes(text)));

    if (bookmarkedWords.length === 0 && searchText.length > 1) {
      logger.info('WordService | searchWord | searched word is not found in the bookmarked list. Searching on the web is initiated');
      axios.get(`https://api.datamuse.com/words?sp=${searchText}&max=5&md=d`).then(({ data }) => {
        logger.success('Word search api have found the defeinition');
        const webResult = synthesizeWordSuggestions(data);
        resolve({
          bookmarkedWords: [],
          wordsOnWeb: webResult
        });
      }, () => {
        logger.error('Error occurred in word search api');
        reject(false);
      });
    } else {
      logger.success('WordService | searchWord | searched word is found in the bookmarked list');
      resolve({
        bookmarkedWords,
        wordsOnWeb: []
      });
    }
  } else if (searchType === 'web') {
    logger.info('WordService | searchWord | searching word definition on the web');
    axios.get(`https://googledictionaryapi.eu-gb.mybluemix.net?define=${searchText}`).then(({ data }) => {
      logger.success('WordService | searchWord | searched word definition is found successfully');
      resolve({
        bookmarkedWords: [],
        wordsOnWeb: [],
        wordDetails: synthesizeWordDefinition(data)
      });
    }, () => {
      logger.error('WordService | searchWord | searched word definition is not found');
      reject(false);
    });
  }
}));

module.exports = {
  getAllWords,
  searchWord
};
