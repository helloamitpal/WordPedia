const UserController = require('./UserController');

class UserWiring {
  static UserController(req, res) {
    return new UserController(req, res);
  }
}

module.exports = UserWiring;
