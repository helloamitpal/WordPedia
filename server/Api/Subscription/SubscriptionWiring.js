const SubscriptionController = require('./SubscriptionController');

class SubscriptionWiring {
  static SubscriptionController(req, res) {
    return new SubscriptionController(req, res);
  }
}

module.exports = SubscriptionWiring;
