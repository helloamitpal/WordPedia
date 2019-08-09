const logger = require('../../util/logger');
const UserModel = require('./UserModel');

/**
 * [register: To register logged in user details]
 * @param  {Object}  userDetails [Object containig user details]
 * @return {Promise}             [success or error promise response]
 */
const register = async (userDetails) => {
  const { userId } = userDetails;
  const existingUser = await UserModel.findOne({ userId });

  if (existingUser) {
    existingUser.enabled = true;
    // DB save
    const savedUser = await existingUser.save();

    if (savedUser) {
      logger.success('UserController | register | user is already saved. Activated successfully');

      return { wordCount: existingUser.words.length };
    }
  }
  // wrapping the object with UserModel
  const user = new UserModel(userDetails);
  // DB save
  const savedUser = await user.save();

  // if data is saved successfully
  if (savedUser) {
    logger.success('UserController | register | saved user successfully');

    return { wordCount: 0 };
  }

  // in case of error response during DB update
  logger.error('UserController | register | Failed to activate user in DB');
  throw new Error();
};

/**
 * [logout: To logout user from the DB]
 * @param  {String}  userId [user id]
 * @return {Promise}        [success or error promise response]
 */
const logout = async (userId) => {
  const data = await UserModel.updateOne({ userId, enabled: false });

  // user has been deleted successfully
  if (data && data.nModified === 1) {
    logger.success('UserController | logout | user has been logged out successfully');

    return true;
  }

  // in case of any error, throwing error
  logger.error('UserController | logout | Failed to remove user from DB');
  throw new Error();
};

const updateUserSettings = async (userDetails) => {
  const data = await UserModel.updateOne(userDetails);

  // user data has been updated successfully
  if (data && data.nModified === 1) {
    logger.success('UserController | updateUserSettings | user data has been updated successfully');

    return true;
  }

  // in case of any error, throwing error
  logger.error('UserController | updateUserSettings | Failed to update user in DB');
  throw new Error();
};

module.exports = {
  logout,
  register,
  updateUserSettings
};
