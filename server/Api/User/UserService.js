const logger = require('../../util/logger');
const UserModel = require('./UserModel');
const Scheduler = require('../../PushNotification/scheduler');

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

      return { details: existingUser, wordCount: existingUser.words.length };
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
  const data = await UserModel.findOne({ userId: userDetails.userId });

  // user data has been updated successfully
  if (data) {
    // if previous quiz setup was disabled and user has asked for enabling the same
    if (userDetails.quiz && !data.quiz) {
      // starting nottification scheduler
      Scheduler.start(data.words);
    }

    if (!userDetails.quiz) {
      // stopping nottification scheduler
      Scheduler.stop();
    }

    // updating existing details with requested user details
    Object.assign(data, userDetails);
    const savedData = await data.save();

    if (savedData) {
      logger.success('UserController | updateUserSettings | user data has been updated successfully');

      return true;
    }

    // in case of any error during save, throwing error
    logger.error('UserController | updateUserSettings | Failed to update user details in DB');
    throw new Error();
  }

  // in case of any error, throwing error
  logger.error('UserController | updateUserSettings | Failed to fetch user in DB for updating the user details');
  throw new Error();
};

module.exports = {
  logout,
  register,
  updateUserSettings
};
