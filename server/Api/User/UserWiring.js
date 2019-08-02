const UserController = require('./UserController');

class UserWiring {
  static AuthController(req, res) {
    return new UserController(req, res);
  }
}

module.exports = UserWiring;
