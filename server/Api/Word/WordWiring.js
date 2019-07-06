const WordController = require('./WordController');

class WordWiring {
  static WordController(req, res) {
    return new WordController(req, res);
  }
}

module.exports = WordWiring;
