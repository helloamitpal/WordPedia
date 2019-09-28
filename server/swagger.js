const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const logger = require('./util/logger');
const config = require('./util/config');

const routes = {
  SUBSCRIPTION: 'server/Api/Subscription/SubscriptionRouter.js',
  USER: 'server/Api/User/UserRouter.js',
  WORD: 'server/Api/Word/WordRouter.js'
};

const initialize = (app) => {
  const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: 'WordPedia',
        version: '1.0.0',
        description: 'This is a learning app to improve the vocabulary.',
        contact: {
          name: 'Amit Pal',
          email: config.CONTACT_EMAIL
        }
      }
    },
    apis: Object.values(routes)
  };
  const swaggerDocument = swaggerJSDoc(swaggerOptions);

  app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  logger.info('Initialized swagger UI');
};

module.exports = {
  initialize
};
