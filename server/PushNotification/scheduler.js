const schedule = require('node-schedule');
const { random } = require('lodash');

const PushNotification = require('./setup');
const logger = require('../util/logger');
const config = require('../util/config');

class Scheduler {

  static start(data) {
    if (Scheduler.job) {
      logger.info('Scheduler is already running');
      return;
    }

    logger.info('Scheduler is initiated to send the nottification at every 3rd hour from 8 through 18 on every day.');
    const scheduleJobPattern = '*/1 * * * *'; // '0 8-18/3 * * 0-6';
    // pattern can be here: https://crontab.guru
    Scheduler.job = schedule.scheduleJob(scheduleJobPattern, (fireDate) => {
      const randVal = random(0, data.length - 1);
      const word = data[randVal];

      logger.info(`Scheduler is sending ${word} response: `, fireDate);

      PushNotification.sendNotification(word);
    });
  }

  static stop() {
    if (Scheduler.job) {
      logger.info('Scheduler is either cancelled or stopped');
      Scheduler.job.cancel();
    }
  }
}

module.exports = Scheduler;
