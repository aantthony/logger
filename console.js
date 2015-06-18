'use strict';

var chalk = require('chalk');

module.exports = Console;

function Console(stream) {
  this._console = console;
  this._tty = stream.isTTY;
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
  var date;
  if (!this._tty) {
    date = t.substring(0, 10) + ' ' + t.substring(11, 19);
  } else {
    var diff = process.hrtime(this._hrtime);
    this._hrtime = process.hrtime();
    var ms = diff[0] * 1e3 + diff[1] * 1e-6;
    date = ms.toFixed(0);
    while (date.length < 4) {
      date = '0' + date;
    }
    date += 'ms';
  }
  var color = colors[payload.level];
  this._console.error(chalk.grey(date) + ' ' + chalk.yellow(payload.component + ':') + ' ' + color(payload.message));
};
