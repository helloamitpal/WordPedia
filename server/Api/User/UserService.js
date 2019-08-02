const logger = require('../../util/logger');
const UserModel = require('./UserModel');

/**
 * [register: To register logged in user details]
 * @param  {Object}  userDetails [Object containig user details]
 * @return {Promise}             [success or error promise response]
 */
const register = async (userDetails) => {
  // wrapping the object with UserModel
  const user = new UserModel(userDetails);
  // DB save
  const savedUser = await user.save();

  // if data is saved successfully
  if (user && savedUser) {
    logger.success('UserController | register | saved user successfully');

    return true;
  }

  // in case of error response during DB save
  logger.error('UserController | register | Failed to save user in DB');
  throw new Error();
};

/**
 * [logout: To logout user from the DB]
 * @param  {String}  userId [user id]
 * @return {Promise}        [success or error promise response]
 */
const logout = async (userId) => {
  const data = await UserModel.deleteOne({ userId });

  // user has been deleted successfully
  if (data) {
    logger.success('UserController | logout | user has been logged out successfully');

    return true;
  }

  // in case of any error, throwing error
  logger.error('UserController | logout | Failed to remove user from DB');
  throw new Error();
};

module.exports = {
  logout,
  register
};
