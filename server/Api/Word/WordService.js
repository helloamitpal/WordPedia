const axios = require('axios');
const logger = require('../../util/logger');
const WordModel = require('./WordModel');
const helper = require('../../util/helper');

// private function: To synthesize response data
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

// private function: To synthesize word definition response to convert WordModel object
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

/**
 * [getAllWords: It returns all bookmarked words]
 * @return {Promise} [A list of WordModel objects]
 */
const getAllWords = async () => {
  const words = await WordModel.find({});

  // all bookmarked words found
  if (words) {
    logger.success('WordService | getAllWords | all bookmarked words are fetched successfully');
    const sortedData = helper.sort(words, 'createdDate', true);
    return sortedData;
  }

  // in case of any error, throwing the error
  logger.error('WordService | getAllWords | Error occurred in fetching all bookmarked words');
  throw new Error();
};

/**
 * [searchWord: To search word in the bookmarked word list]
 * @param  {String}  searchText [a word to be searched]
 * @param  {String}  searchType [to determine, where to search; in the web or the bookmark list]
 * @return {Promise}            [WordModel object of found word definition]
 */
const searchWord = async (searchText, searchType) => {
  const text = (searchText && decodeURI(searchText).toLowerCase()) || '';

  logger.info(`WordService | searchWord | searching word definition on the ${searchType} for "${text}"`);

  // if search type is in the bookmarked word list
  if (searchType === 'bookmark') {
    const bookmarkedWords = await WordModel.find({ word: { $regex: text, $options: 'i' } });

    // if word definition is found in the bookmark list
    if (bookmarkedWords && bookmarkedWords.length > 0) {
      logger.success(`WordService | searchWord | searched word "${text}" is found in the bookmarked list`);

      return {
        bookmarkedWords,
        wordsOnWeb: []
      };
    }

    // if the word definition is not found in the bookmark list then web search is initiated
    if (bookmarkedWords.length === 0) {
      logger.info(`WordService | searchWord | searched word "${text}" is not found in the bookmarked list. Searching on the web is initiated`);
      const { data } = await axios.get(`https://api.datamuse.com/words?sp=${text}&max=5&md=d`);

      // if word definition found on the web
      if (data) {
        logger.success(`Word search api have found the defeinition for "${text}"`);

        return {
          bookmarkedWords: [],
          wordsOnWeb: synthesizeWordSuggestions(text, data)
        };
      }

      // if word definition found neither on the web nor bookmark list, then sending null
      logger.error(`Error occurred in word search api for "${text}"`);

      return {
        bookmarkedWords: [],
        wordsOnWeb: null
      };
    }
  }

  // if search type is on the web
  if (searchType === 'web') {
    const { data } = await axios.get(`https://googledictionaryapi.eu-gb.mybluemix.net?define=${text}`);

    // if the word definition found on the web
    if (data) {
      logger.success(`WordService | searchWord | searched word definition is found successfully for "${text}"`);

      return {
        bookmarkedWords: [],
        wordsOnWeb: [],
        wordDetails: synthesizeWordDefinition(data)
      };
    }

    // if word definition is not found on the web
    logger.error(`WordService | searchWord | searched word definition is not found for "${text}"`);

    return {
      bookmarkedWords: [],
      wordsOnWeb: [],
      wordDetails: null
    };
  }
};

/**
 * [addWord: To add word definition to the bookmark list]
 * @param  {Object}  wordDetails [word definition object]
 * @return {Promise}             [success or error promise response]
 */
const addWord = async (wordDetails) => {
  const text = wordDetails.word.toLowerCase();

  // if long-definition is present, then no api will be called to fetch the full definition
  if (wordDetails.longDefinitions && wordDetails.longDefinitions.length) {
    // wrapping the object with WordModel
    const data = new WordModel(wordDetails);
    // DB save
    const savedData = await data.save();

    // In case of success response
    if (data && savedData) {
      logger.success(`WordService | addWord | long defeinition found. "${text}" word definition is added to DB successfully`);

      return {
        wordDetails: data
      };
    }

    // in case of error response during DB save
    logger.error(`WordService | addWord | long defeinition found. Failed to save word "${text}" definition in DB`);
    throw new Error();
  }

  // if long definition is not found, the api is called to fetch the full definition
  const { data } = await axios.get(`https://googledictionaryapi.eu-gb.mybluemix.net?define=${text}`);
  // if the word definition is found successfully
  if (data) {
    const synthesizedData = synthesizeWordDefinition(data);
    const savedData = await synthesizedData.save();

    // if DB save gets success
    if (savedData) {
      logger.success(`WordService | addWord | word "${text}" definition is fetched from API and added to DB successfully`);

      return {
        wordDetails: synthesizedData
      };
    }

    // in case of any DB save error
    logger.error(`WordService | addWord | Failed to save word "${wordDetails.word}" definition in DB`);
    throw new Error();
  }

  logger.error(`WordService | addWord | Failed to fetch word definition from API. "${text}" is not added to DB`);
  throw new Error();
};

/**
 * [deleteWord: To delete the word from the bookmark]
 * @param  {String}  word [word to be deleted]
 * @return {Promise}      [success or error promise response]
 */
const deleteWord = async (word) => {
  const data = await WordModel.deleteOne({ word });

  // data has been deleted successfully
  if (data) {
    logger.success(`WordService | deleteWord | word definition is deleted successfully for "${word}"`);
    return true;
  }

  // in case of any error, throwing error
  logger.error(`WordService | deleteWord | word definition is not deleted for "${word}"`);
  throw new Error();
};

module.exports = {
  getAllWords,
  searchWord,
  addWord,
  deleteWord
};
