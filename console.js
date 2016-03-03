'use strict';

var chalk = require('./chalk');

module.exports = Console;

function Console(stream) {
  this._console = console;
  this._hrtime = process.hrtime();
}

var identity = function (x) { return x; };

var colors = {
  log   : identity,
  warn  : chalk.yellow,
  info  : identity,
  error : chalk.red,
  debug : identity
};

Console.prototype.write = function (payload) {
  var t = payload.time.toISOString ? payload.time.toISOString() : payload.time;
  var date = t.substring(0, 10) + ' ' + t.substring(11, 19);
  var color = colors[payload.level];
  this._console.error(chalk.grey(date) + ' ' + chalk.yellow(payload.component + ':') + ' ' + color(payload.message));
};
