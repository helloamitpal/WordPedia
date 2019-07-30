const axios = require('axios');
const logger = require('../../util/logger');
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
  const synonyms = [];

  resp.forEach((respObj) => {
    const examples = [];

    if (respObj.origins) {
      origins.push(respObj.origins);
    }

    Object.entries(respObj.meaning).forEach((meaning) => {
      if (meaning[1] && meaning[1].length) {
        meaning[1].forEach((defObj) => {
          if (defObj.definition && defObj.definition.trim()) {
            shortDefinitions.push(defObj.definition);
            examples.push({ definition: defObj.definition, example: defObj.example });
          }

          if (defObj.synonyms && defObj.synonyms.length > 0) {
            synonyms.push(...defObj.synonyms);
          }
        });
      }

      longDefinitions.push({
        type: meaning[0],
        examples
      });
    });
  });

  return new WordModel({
    word: resp[0].word,
    phonetic: resp[0].phonetic,
    origins,
    shortDefinitions,
    longDefinitions,
    synonyms
  });
};

const getAllWords = () => {
  return new Promise((resolve, reject) => {
    WordModel.find({}, (error, words) => {
      if (words) {
        logger.success('WordService | getAllWords | all bookmarked words are fetched successfully');
        resolve(words);
      } else if (error) {
        logger.error('WordService | getAllWords | Error occurred in fetching all bookmarked words');
        reject(false);
      }
    });
  });
};

const searchWord = (searchText, searchType) => (new Promise((resolve) => {
  const text = (searchText && decodeURI(searchText).toLowerCase()) || '';

  if (searchType === 'bookmark') {
    // DB text contains search with mongoose $regex
    WordModel.find({ word: { $regex: text, $options: 'i' } }, (error, bookmarkedWords) => {
      if (bookmarkedWords && bookmarkedWords.length) {
        logger.success(`WordService | searchWord | searched word "${text}" is found in the bookmarked list`);

        resolve({
          bookmarkedWords,
          wordsOnWeb: []
        });
      } else if (bookmarkedWords.length === 0 && text.length > 1) {
        logger.info(`WordService | searchWord | searched word "${text}" is not found in the bookmarked list. Searching on the web is initiated`);

        axios.get(`https://api.datamuse.com/words?sp=${text}&max=5&md=d`).then(({ data }) => {
          logger.success(`Word search api have found the defeinition for "${text}"`);
          const webResult = synthesizeWordSuggestions(text, data);

          resolve({
            bookmarkedWords: [],
            wordsOnWeb: webResult
          });
        }, () => {
          logger.error(`Error occurred in word search api for "${text}"`);

          resolve({
            bookmarkedWords: [],
            wordsOnWeb: null
          });
        });
      }
    });
  } else if (searchType === 'web') {
    logger.info(`WordService | searchWord | searching word definition on the web for "${text}"`);

    axios.get(`https://googledictionaryapi.eu-gb.mybluemix.net?define=${text}`).then(({ data }) => {
      logger.success(`WordService | searchWord | searched word definition is found successfully for "${text}"`);

      resolve({
        bookmarkedWords: [],
        wordsOnWeb: [],
        wordDetails: synthesizeWordDefinition(data)
      });
    }, () => {
      logger.error(`WordService | searchWord | searched word definition is not found for "${text}"`);

      resolve({
        bookmarkedWords: [],
        wordsOnWeb: [],
        wordDetails: null
      });
    });
  }
}));

const addWord = (wordDetails) => {
  return new Promise((resolve, reject) => {
    if (wordDetails.longDefinitions && wordDetails.longDefinitions.length) {
      const data = new WordModel(wordDetails);
      data.save((err) => {
        if (!err) {
          logger.success(`WordService | addWord | word definition is added successfully for "${wordDetails.word}"`);

          resolve({
            wordDetails: data
          });
        } else {
          logger.error(`WordService | searchWord | Failed to save word definition for "${wordDetails.word}"`);

          reject(false);
        }
      });
    } else {
      const text = wordDetails.word.toLowerCase();

      axios.get(`https://googledictionaryapi.eu-gb.mybluemix.net?define=${text}`).then(({ data }) => {
        logger.success(`WordService | addWord | word definition is added successfully for "${text}"`);

        const synthesizedData = synthesizeWordDefinition(data);
        synthesizedData.save((err) => {
          if (!err) {
            resolve({
              wordDetails: synthesizedData
            });
          } else {
            logger.error(`WordService | addWord | Failed to save word definition for "${text}"`);

            reject(false);
          }
        });
      }, () => {
        logger.error(`WordService | addWord | word definition is not added for "${text}"`);

        reject(false);
      });
    }
  });
};

const deleteWord = (word) => {
  return new Promise((resolve, reject) => {
    WordModel.deleteOne({ word }, (error) => {
      if (!error) {
        logger.success(`WordService | deleteWord | word definition is deleted successfully for "${word}"`);

        resolve(true);
      } else {
        logger.error(`WordService | deleteWord | word definition is not deleted for "${word}"`);

        reject(false);
      }
    });
  });
};

module.exports = {
  getAllWords,
  searchWord,
  addWord,
  deleteWord
};
