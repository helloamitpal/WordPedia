const schedule = require('node-schedule');
const { random } = require('lodash');

const PushNotification = require('./setup');
const logger = require('../util/logger');

class Scheduler {
  constructor() {
    this.scheduler = null;
    this.data = null;
  }

  start(data) {
    this.data = data;

    if (this.scheduler) {
      this.scheduler.reschedule();
      return;
    }

    this.scheduler = schedule.scheduleJob('0 8-18/3 * * 0-6', () => {
      logger.info('Scheduler started: At minute 0 past every 3rd hour from 8 through 18 on every day-of-week from Sunday through Saturday.');
      const randVal = random(0, this.data.length - 1);

      PushNotification.sendNotification(this.data[randVal]);
    });
  }

  stop() {
    if (this.scheduler) {
      logger.info('Scheduler cancelled');
      this.scheduler.cancel();
    }
  }
}

module.exports = new Scheduler();
