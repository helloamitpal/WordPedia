/* eslint-disable no-console */
const chalk = require('chalk');
const ip = require('ip');

const divider = chalk.gray('\n-----------------------------------');

/**
 * Logger middleware, you can customize it to make messages more personal
 */
const logger = {
  // Called whenever there's an error on the server we want to print
  error: (err) => {
    console.error(chalk.red(err));
  },

  info: (info) => {
    console.log(chalk.yellow(info));
  },

  success: (success) => {
    console.log(chalk.green(success));
  },

  // Called when express.js app starts on given port w/o errors
  appStarted: (port, host) => {
    console.log(`Server started ! ${chalk.green('✓')}`);

    console.log(`
        ${chalk.bold(`Mode: ${process.env.NODE_ENV}`)}${divider}
        ${chalk.bold('Access URLs:')}${divider}
        Localhost: ${chalk.magenta(`http://${host}:${port}`)}
        LAN: ${chalk.magenta(`http://${ip.address()}:${port}`)}${divider}
        ${chalk.red(`Press ${chalk.italic('CTRL-C')} to stop`)}
    `);
  }
};

module.exports = logger;
