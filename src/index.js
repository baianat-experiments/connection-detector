const TIMEOUT = 5000;

export default class Down {
  constructor ({ fetch = null } = {}) {
    if (typeof navigator === 'undefined' || typeof window === 'undefined') {
      throw new Error('Cannot detect the navigator object, make sure to use this library in browser environment');
    }

    this.isDown = false;
    this.$fetch = fetch || window.fetch;

    const updateState = () => {
      return this._confirmDownState().then(status => {
        this.isDown = status;
      });
    };

    this.on('offline', updateState);
    this.on('online', updateState);

    if (this.isDisconnected) {
      updateState();
    }
  }

  get url () {
    return `/favico.ico?_=${(new Date()).getTime()}`;
  }

  get isDisconnected () {
    return !navigator.onLine;
  }

  _createTimer () {
    return new Promise((_, reject) => {
      setTimeout(() => {
        const error = new Error('Timed out');
        error.isTimeout = true;
        reject(error);
      }, TIMEOUT);
    })
  }

  _confirmDownState () {
    if (typeof this.$fetch !== 'function') {
      throw new Error('You must provide a fetch polyfill');
    }

    return Promise.race([
      this._createTimer(),
      this.$fetch(this.url, {
        redirect: 'manual'
      })
    ])
    .then(() => false)
    .catch(err => !!err.isTimeout);
  }

  on (eventName, callback) {
    if (['online', 'offline'].indexOf(eventName) === -1) {
      throw new Error('event name must be either "online" or "offline"');
    }

    window.addEventListener(eventName, callback);

    return () => {
      window.removeEventListener(eventName, callback);
    };
  }
};
