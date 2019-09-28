const express = require('express');
const { resolve } = require('path');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const dotenv = require('dotenv');
const events = require('events');

const logger = require('./util//logger');
const argv = require('./util/argv');
const port = require('./util/port');
const DB = require('./DB/connection');
const setupMiddleware = require('./middlewares/frontendMiddleware');
const PushNotification = require('./PushNotification/setup');
const Swagger = require('./swagger');

const app = express();

// making .env file to process.env
dotenv.config();

// creating event emitter instance
const eventEmitter = new events.EventEmitter();

// server configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors({
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
}));
app.disable('x-powered-by');
app.use(compression());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('X-Content-Type-Options', 'no sniff');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.set('Cache-Control', 'public, max-age=31557600');

  next();
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// initialize push notification
PushNotification.initialize();

// initialize DB connection
DB.initialize(eventEmitter);

// initialize swagger UI for API documentation
Swagger.initialize(app);

// In production we need to pass these values in instead of relying on webpack
setupMiddleware(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/'
});

// Start your app.
app.listen(port, host, (err) => {
  if (err) {
    return logger.error(err.message);
  }
  eventEmitter.on('DBConnectSuccess', () => {
    logger.appStarted(port, prettyHost);
  });
});
