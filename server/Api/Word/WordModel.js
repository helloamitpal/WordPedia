const mongoose = require('mongoose');

const WordModel = new mongoose.Schema({
  word: { type: String, default: '' },
  phonetic: { type: String, default: '' },
  origins: { type: Array, default: [] },
  shortDefinitions: { type: Array, default: [] },
  longDefinitions: { type: Array, default: [] },
  synonyms: { type: Array, default: [] }
});

// class WordModel {
//   constructor({ word, phonetic, origins, longDefinitions, shortDefinitions, synonyms }) {
//     this.word = word || '';
//     this.phonetic = phonetic || '';
//     this.origins = origins || [];
//     this.longDefinitions = longDefinitions || [];
//     this.shortDefinitions = shortDefinitions || [];
//     this.synonyms = synonyms || [];
//   }
// }

module.exports = mongoose.model('WordModel', WordModel);
