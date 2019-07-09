class WordModel {
  constructor({ word, phonetic, origins, longDefinitions, shortDefinitions }) {
    this.word = word || '';
    this.phonetic = phonetic || '';
    this.origins = origins || [];
    this.longDefinitions = longDefinitions || [];
    this.shortDefinitions = shortDefinitions || [];
  }
}

module.exports = WordModel;
