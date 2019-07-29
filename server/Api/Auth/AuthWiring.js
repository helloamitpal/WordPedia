const AuthController = require('./AuthController');

class AuthWiring {
  static AuthController(req, res) {
    return new AuthController(req, res);
  }
}

module.exports = AuthWiring;
