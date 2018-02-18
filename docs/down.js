/**
  * down.js v0.0.0
  * (c) 2018 Baianat
  * @license MIT
  */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Down = factory());
}(this, (function () { 'use strict';

var TIMEOUT = 5000;

var Down = function Down (ref) {
  var this$1 = this;
  if ( ref === void 0 ) ref = {};
  var fetch = ref.fetch; if ( fetch === void 0 ) fetch = null;

  if (typeof navigator === 'undefined' || typeof window === 'undefined') {
    throw new Error('Cannot detect the navigator object, make sure to use this library in browser environment');
  }

  this.isDown = false;
  this.$fetch = fetch || window.fetch;

  var updateState = function () {
    return this$1._confirmDownState().then(function (status) {
      this$1.isDown = status;
    });
  };

  this.on('offline', updateState);
  this.on('online', updateState);

  if (this.isDisconnected) {
    updateState();
  }
};

var prototypeAccessors = { url: { configurable: true },isDisconnected: { configurable: true } };

prototypeAccessors.url.get = function () {
  return ("/favico.ico?_=" + ((new Date()).getTime()));
};

prototypeAccessors.isDisconnected.get = function () {
  return !navigator.onLine;
};

Down.prototype._createTimer = function _createTimer () {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      var error = new Error('Timed out');
      error.isTimeout = true;
      reject(error);
    }, TIMEOUT);
  })
};

Down.prototype._confirmDownState = function _confirmDownState () {
  if (typeof this.$fetch !== 'function') {
    throw new Error('You must provide a fetch polyfill');
  }

  return Promise.race([
    this._createTimer(),
    this.$fetch(this.url, {
      redirect: 'manual'
    })
  ])
  .then(function () { return false; })
  .catch(function (err) { return !!err.isTimeout; });
};

Down.prototype.on = function on (eventName, callback) {
  if (['online', 'offline'].indexOf(eventName) === -1) {
    throw new Error('event name must be either "online" or "offline"');
  }

  window.addEventListener(eventName, callback);

  return function () {
    window.removeEventListener(eventName, callback);
  };
};

Object.defineProperties( Down.prototype, prototypeAccessors );

return Down;

})));
