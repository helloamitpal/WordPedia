const Agenda = require('agenda');

const { getDBConnection } = require('../DB/connection');
const logger = require('../util/logger');
const NotificationSender = require('./notificationSender');

module.exports = () => {
  const agenda = new Agenda({
    db: {
      address: getDBConnection(),
      collection: 'notification'
    }
  });

  (async () => {
    await agenda._ready;

    try {
      agenda._collection.ensureIndex({
        disabled: 1,
        lockedAt: 1,
        name: 1,
        nextRunAt: 1,
        priority: -1
      }, {
        name: 'findAndLockNextJobIndex'
      });
    } catch (err) {
      logger.error('Job | Failed to create agendajs index!');
      throw err;
    }
  })();

  agenda
    .processEvery('5 seconds')
    .maxConcurrency(20);

  const JOB_NAME = 'send-notification';

  agenda.define(JOB_NAME, { priority: 'high', concurrency: 10 }, new NotificationSender().handler);

  return { agenda, JOB_NAME };
};
