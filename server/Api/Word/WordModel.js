class WordModel {
  constructor({ word, phonetic, origin, longDefinitions, shortDefinitions }) {
    this.word = word || '';
    this.phonetic = phonetic || '';
    this.origin = origin || [];
    this.longDefinitions = longDefinitions || [];
    this.shortDefinitions = shortDefinitions || [];
  }
}

module.exports = WordModel;
