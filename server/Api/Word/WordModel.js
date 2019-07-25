class WordModel {
  constructor({ word, phonetic, origins, longDefinitions, shortDefinitions, synonyms }) {
    this.word = word || '';
    this.phonetic = phonetic || '';
    this.origins = origins || [];
    this.longDefinitions = longDefinitions || [];
    this.shortDefinitions = shortDefinitions || [];
    this.synonyms = synonyms || [];
  }
}

module.exports = WordModel;
