const mongoose = require('mongoose');

const logger = require('../util/logger');

const getDBConnectionString = () => {
  const { DB_USERNAME, DB_PASSWORD, CLUSTER_NAME, DB_NAME } = process.env;
  const connectionStr = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${CLUSTER_NAME}/${DB_NAME}?ssl=true&authSource=admin&w=majority`;

  return connectionStr;
};

const initialize = (eventEmitter) => {
  const connectionStr = getDBConnectionString();

  mongoose.connect(connectionStr, { useNewUrlParser: true, useCreateIndex: true });

  const db = mongoose.connection;
  db.once('open', () => {
    logger.success('DB connection has been established successfully');
    eventEmitter.emit('DBConnectSuccess');
  });

  db.on('error', (err) => {
    logger.error('Error occurred in DB connection. Please check the internet connection !', err);
    throw Error('Error occurred in DB connection. Hence the build is broken.');
  });
};

module.exports = {
  initialize,
  getDBConnectionString
};
