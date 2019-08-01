const mongoose = require('mongoose');

const { Schema } = mongoose;

const WordModelSchema = new Schema({
  word: { type: String, default: '', unique: true },
  phonetic: { type: String, default: '' },
  origins: { type: Array, default: [] },
  shortDefinitions: { type: Array, default: [] },
  longDefinitions: { type: Array, default: [] },
  synonyms: { type: Array, default: [] },
  createdDate: { type: String, default: new Date().toISOString() }
});

module.exports = mongoose.model('WordModel', WordModelSchema);
