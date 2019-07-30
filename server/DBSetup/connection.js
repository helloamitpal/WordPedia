const mongoose = require('mongoose');

const logger = require('../util/logger');

const initialize = () => {
  const connectionStr = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@wordpediacluster-epz4o.mongodb.net/${process.env.DB_NAME}?ssl=true&authSource=admin&w=majority`;
  mongoose.connect(connectionStr, { useNewUrlParser: true });

  const db = mongoose.connection;
  db.once('open', () => {
    logger.success('DB connection has been established successfully');
  });

  db.on('error', (err) => {
    logger.error('Error occurred in DB connection.', err);
    throw Error('Error occurred in DB connection. Hence the build is broken.');
  });
};

module.exports = {
  initialize
};
