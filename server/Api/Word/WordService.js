const axios = require('axios');
const logger = require('../../util/logger');
const mockData = require('../../mock-data/wordList');
const WordModel = require('./WordModel');
const helper = require('../../util/helper');

const synthesizeWordSuggestions = (searchText, resp) => {
  const arr = [];
  let exactMatch = false;
  resp.forEach(({ defs, score, word }) => {
    if (!exactMatch && defs && defs.length && parseInt(score, 10) >= 1000) {
      arr.push(new WordModel({
        word,
        shortDefinitions: helper.replaceChars(defs, '\t')
      }));
      exactMatch = (searchText === word);
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
  return WordModel.find({});
};

const searchWord = (searchText, searchType) => (new Promise((resolve) => {
  const text = (searchText && decodeURI(searchText).toLowerCase()) || '';

  if (searchType === 'bookmark') {
    const bookmarkedWords = mockData.filter(({ word }) => (word.includes(text)));

    if (bookmarkedWords.length === 0 && text.length > 1) {
      logger.info('WordService | searchWord | searched word is not found in the bookmarked list. Searching on the web is initiated');
      axios.get(`https://api.datamuse.com/words?sp=${text}&max=5&md=d`).then(({ data }) => {
        logger.success('Word search api have found the defeinition');
        const webResult = synthesizeWordSuggestions(text, data);
        resolve({
          bookmarkedWords: [],
          wordsOnWeb: webResult
        });
      }, () => {
        logger.error('Error occurred in word search api');
        resolve({
          bookmarkedWords: [],
          wordsOnWeb: null
        });
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
    axios.get(`https://googledictionaryapi.eu-gb.mybluemix.net?define=${text}`).then(({ data }) => {
      logger.success('WordService | searchWord | searched word definition is found successfully');
      resolve({
        bookmarkedWords: [],
        wordsOnWeb: [],
        wordDetails: synthesizeWordDefinition(data)
      });
    }, () => {
      logger.error('WordService | searchWord | searched word definition is not found');
      resolve({
        bookmarkedWords: [],
        wordsOnWeb: [],
        wordDetails: null
      });
    });
  }
}));

const addWord = (wordDetails) => {
  return wordDetails;
};

const deleteWord = (word) => {
  return word;
};

module.exports = {
  getAllWords,
  searchWord,
  addWord,
  deleteWord
};
