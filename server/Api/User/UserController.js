const logger = require('../../util/logger');
const UserService = require('./UserService');
const ErrorHandler = require('../../util/errorHandler');

class UserController {
  register(req, res) {
    const payload = req.body;

    if (payload) {
      logger.info('UserController | register');
      UserService.register(payload)
        .then((data) => {
          logger.success('UserController | register | sending success response');
          res.json(data);
        })
        .catch(() => {
          logger.error('UserController | register | Sending error response');
          ErrorHandler(500, 'Failed to register user', res);
        });
    } else {
      logger.error('UserController | register | Sending error response because body payload is null');
      ErrorHandler(500, 'Failed to register user', res);
    }
  }

  updateUserSettings(req, res) {
    const payload = req.body;

    if (payload) {
      logger.info('UserController | register');
      UserService.updateUserSettings(payload)
        .then((data) => {
          logger.success('UserController | updateUserSettings | sending success response');
          res.json(data);
        })
        .catch(() => {
          logger.error('UserController | updateUserSettings | Sending error response');
          ErrorHandler(500, 'Failed to update user', res);
        });
    } else {
      logger.error('UserController | updateUserSettings | Sending error response because body payload is null');
      ErrorHandler(500, 'Failed to update user', res);
    }
  }

  logout(req, res) {
    const payload = req.body;

    if (payload && payload.userId) {
      logger.info('UserController | logout');
      UserService.logout(payload.userId)
        .then((data) => {
          logger.success('UserController | logout | sending success response');
          res.send(data);
        })
        .catch(() => {
          logger.error('UserController | logout | Sending error response');
          ErrorHandler(500, 'Failed to logout user', res);
        });
    } else {
      logger.error('UserController | logout | Sending error response because body payload is null');
      ErrorHandler(500, 'Failed to logout user', res);
    }
  }
}

module.exports = UserController;
