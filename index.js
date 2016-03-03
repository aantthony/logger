'use strict';

var EventEmitter = require('events').EventEmitter;
var Console = require('./console');

var hostname = require('os').hostname();
var pid      = process.pid;

var emitter = new EventEmitter();
var _console = new Console(process.stderr);

module.exports = factory;

factory.on = function (event, listener) {
  emitter.on(event, listener);
};
factory.removeListener = function (event, listener) {
  emitter.removeListener(event, listener);
};

factory.setOutputStream = function (stream) {
  if (!stream) {
    _console = null;
    return;
  }
  _console = new Console(stream);
};

function factory (componentName) {
  return new LoggingContext(componentName);
}

function LoggingContext(componentName) {
  this._name = componentName;
}

LoggingContext.prototype.chalk = require('./chalk');

LoggingContext.prototype._write = function (level, message, data) {
  var payload = {
    component : this._name,
    time      : new Date(),
    hostname  : hostname,
    level     : level,
    message   : message,
    pid       : pid,
    data      : data
  };
  emitter.emit('data', payload);
  if (_console) {
    _console.write(payload);
  }
};

['log', 'warn', 'info', 'error', 'debug']
.forEach(function (level) {
  LoggingContext.prototype[level] = function (message, metadata) {
    this._write(level, message, metadata);
  };
});
