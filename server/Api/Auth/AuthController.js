const passport = require('passport');

const logger = require('../../util/logger');
const AuthService = require('./AuthService');
const User = require('./UserModel');

class AuthController {
  constructor() {
    passport.serializeUser((user, callback) => {
      callback(null, user.id);
    });

    passport.deserializeUser((id, callback) => {
      User.findById(id, (err, user) => {
        callback(err, user);
      });
    });
  }

  success(req, res) {
    logger.info('AuthController | success');
    const data = AuthService.getSuccess();
    res.send(data);
  }

  error(req, res) {
    logger.info('AuthController | error');
    const data = AuthService.getError();
    res.send(data);
  }
}

module.exports = AuthController;
