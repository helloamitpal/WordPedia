const mongoose = require('mongoose');

const logger = require('../util/logger');

const initialize = () => {
  const connectionStr = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@wordpediacluster-epz4o.mongodb.net/${process.env.DB_NAME}?ssl=true&authSource=admin&w=majority`;
  mongoose.connect(connectionStr, { useNewUrlParser: true });

  mongoose.connection.on('open', () => {
    logger.success('DB connection has been established successfully');
  });

  mongoose.connection.on('error', (err) => {
    logger.error('Error occurred in DB connection.', err);
  });
};

module.exports = {
  initialize
};
