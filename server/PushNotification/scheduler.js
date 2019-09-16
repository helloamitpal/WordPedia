const logger = require('../util/logger');
const { agenda, JOB_NAME } = require('./job')();

class Scheduler {

  static async start(userId) {
    agenda.start();
    agenda.every('in 8 hours', JOB_NAME, { userId });

    logger.info('Scheduler | Starting notification scheduler');
  }

  static async stop() {
    agenda.cancel();
    logger.info('Scheduler | Stopping notification scheduler');
  }
}

module.exports = Scheduler;
