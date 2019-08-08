const axios = require('axios');
const logger = require('../../util/logger');
const WordModel = require('./WordModel');
const UserModel = require('../User/UserModel');
const helper = require('../../util/helper');

// private function: To synthesize response data
const synthesizeWordSuggestions = (searchText, resp) => {
  const arr = [];
  let exactMatch = false;
  resp.forEach(({ defs, score, word }) => {
    if (!exactMatch && defs && defs.length && parseInt(score, 10) >= 500) {
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
const getAllWords = async (userId) => {
  const user = await UserModel.findOne({ userId });

  if (user) {
    const wordList = await WordModel.find({ word: { $in: user.words } });

    // all bookmarked words found
    if (wordList && wordList.length > 0) {
      logger.success('WordService | getAllWords | all bookmarked words are fetched successfully');
      // const sortedData = helper.sort(wordList, 'createdDate', true);
      return wordList;
    }

    // in case of any error, throwing the error
    logger.error('WordService | getAllWords | Error occurred in fetching all bookmarked words');
    throw new Error();
  }

  // in case of any error, throwing the error
  logger.error('WordService | getAllWords | User not found with given user id. Hence throwing error');
  throw new Error();
};

// private function: to search the word in the prime word list as well as on the web
const searchWordOnWeb = async (text) => {
  const words = await WordModel.find({ word: { $regex: text, $options: 'i' } });

  // word found in the prime word list
  if (words && words.length) {
    logger.success(`WordService | searchWordOnWeb | searched word "${text}" is not found in the prime word list. Initiated the searching on the web`);

    return {
      bookmarkedWords: [],
      wordsOnWeb: words
    };
  }

  logger.info(`WordService | searchWordOnWeb | searched word "${text}" is not found in the bookmarked list. Initiated the searching on the web`);
  const { data } = await axios.get(`https://api.datamuse.com/words?sp=${text}&max=5&md=d`);

  // if word definition found on the web
  if (data) {
    logger.success(`Word search api have found the defeinition for "${text}"`);

    return {
      bookmarkedWords: [],
      wordsOnWeb: synthesizeWordSuggestions(text, data)
    };
  }

  // if word definition found neither on the web nor prime word list, then sending null
  logger.error(`Error occurred in "${text}" search api`);

  return {
    bookmarkedWords: [],
    wordsOnWeb: null
  };
};

/**
 * [searchBookmarkedWord: To search the word in the user's bookmarked word list]
 * @param  {String}  text [text to search on the web]
 * @param  {String}  userId [userId to search for the user to fetch bookmarked words]
 * @return {Promise}      [success or error promise response]
 */
const searchBookmarkedWord = async (text, userId) => {
  logger.info(`WordService | searchBookmarkedWord | searching "${text}" definition in the bookmarked list"`);

  const user = (Number(userId) > 0) ? await UserModel.findOne({ userId }) : null;

  // if user is found then search for bookmarked words
  if (user) {
    const { words } = user;
    const matchedWords = words.filter((word) => (word.includes(text)));
    const bookmarkedWords = await WordModel.find({ word: { $in: matchedWords } });

    // if word definition is found in the bookmark list
    if (bookmarkedWords && bookmarkedWords.length > 0) {
      logger.success(`WordService | searchBookmarkedWord | searched word "${text}" is found in the bookmarked list`);

      return {
        bookmarkedWords,
        wordsOnWeb: []
      };
    }

    // if searched word is not found in the bookmarked list
    return searchWordOnWeb(text);
  }
  // if the user is not found then searching the word on the web
  return searchWordOnWeb(text);
};

/**
 * [searchWordInWeb: To search word on the web]
 * @param  {String}  text [text to search on the web]
 * @return {Promise}      [success or error promise response]
 */
const searchWordDefinitionOnWeb = async (text) => {
  logger.info(`WordService | searchWordDefinitionOnWeb | searching "${text}" definition on the web"`);

  const { data } = await axios.get(`https://googledictionaryapi.eu-gb.mybluemix.net?define=${text}`);

  // if the word definition found on the web
  if (data) {
    logger.success(`WordService | searchWordDefinitionOnWeb | searched word "${text}" definition is found successfully on the web`);

    return {
      bookmarkedWords: [],
      wordsOnWeb: [],
      wordDetails: synthesizeWordDefinition(data)
    };
  }

  // if word definition is not found on the web
  logger.error(`WordService | searchWordDefinitionOnWeb | searched word "${text}" definition is not found`);

  return {
    bookmarkedWords: [],
    wordsOnWeb: [],
    wordDetails: null
  };
};

// private function: to save word to the user's word list
const saveWordToUser = async (userId, details) => {
  const { word } = details;

  const user = await UserModel.findOne({ userId });

  if (user) {
    user.words.push(word);
    const savedUser = await user.save();

    if (savedUser) {
      logger.success(`${word} has been saved to the user's word list successfully`);

      return {
        wordDetails: details
      };
    }

    logger.error(`${word} has not been saved to the user's word list`);
    throw new Error();
  }

  logger.error(`Didn't find user to save the word ${word} to the user's word list`);
  throw new Error();
};

/**
 * [addWord: To add word definition to the bookmark list]
 * @param  {Object}  wordDetails [word definition object]
 * @return {Promise}             [success or error promise response]
 */
const addWord = async (wordDetails) => {
  const { userId, word } = wordDetails;
  const text = word.toLowerCase();

  const searchedWord = await WordModel.findOne({ word: text });

  if (searchedWord) {
    logger.success(`WordService | addWord | "${text}" definition is already there in the DB`);
    return saveWordToUser(userId, wordDetails);
  }

  // this is a new word to be saved in the DB
  // if long-definition is present, then no api will be called to fetch the full definition
  if (wordDetails.longDefinitions && wordDetails.longDefinitions.length) {
    // wrapping the object with WordModel
    const data = new WordModel(wordDetails);
    // DB save
    const savedData = await data.save();

    // In case of success response
    if (data && savedData) {
      logger.success(`WordService | addWord | long defeinition found. "${text}" word definition is added to DB successfully`);
      return saveWordToUser(userId, data);
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
      return saveWordToUser(userId, synthesizedData);
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
const deleteWord = async (word, userId) => {
  const userData = await UserModel.findOne({ userId });

  // user data has been found successfully
  if (userData) {
    const { words } = userData;
    const updatedWordList = words.filter((val) => (val !== word));
    const updatedUser = new WordModel({ words: updatedWordList });
    const user = await updatedUser.save();

    if (user) {
      logger.success(`WordService | deleteWord | "${word}" definition is deleted successfully for the user`);
      return true;
    }

    logger.error(`WordService | deleteWord | failed to save user with deleted word definition of "${word}"`);
    throw new Error();
  }

  // in case of any error, throwing error
  logger.error(`WordService | deleteWord | "${word}" definition is not deleted`);
  throw new Error();
};

module.exports = {
  getAllWords,
  searchWordDefinitionOnWeb,
  searchBookmarkedWord,
  addWord,
  deleteWord
};
