class EventEmitter {
  constructor() {
    this.events = {};
    this.maxListeners = 2;
  }

  on(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    if (this.events[eventName].length >= this.maxListeners) {
      console.warn(
        `Max listeners (${this.maxListeners}) for event ${eventName} exceeded`
      );
    } else {
      this.events[eventName].push(listener);
    }
  }

  addListener(eventName, listener) {
    this.on(eventName, listener);
  }

  removeListener(eventName, listenerToRemove) {
    const listeners = this.events[eventName];
    if (listeners) {
      const index = listeners.findIndex(
        (listener) => listener.toString() === listenerToRemove.toString()
      );
      if (index > -1) {
        listeners.splice(index, 1);
      } else {
        console.warn(
          `Can't remove listener. Listener ${listenerToRemove} doesn't exist`
        );
      }
    } else {
      console.warn(`Can't remove listener. Event ${eventName} doesn't exist`);
    }
  }

  removeAllListeners(eventName) {
    if (this.events[eventName]) {
      this.events[eventName] = [];
    } else {
      console.warn(`Can't remove listeners. Event ${eventName} doesn't exist`);
    }
  }

  once(eventName, listener) {
    const onceWrapper = (...args) => {
      listener.apply(null, args);
      this.removeListener(eventName, onceWrapper);
    };
    this.on(eventName, onceWrapper);
  }

  emit(eventName, ...args) {
    const listeners = this.events[eventName];
    if (listeners) {
      listeners.forEach((listener) => listener.apply(null, args));
    } else {
      console.warn(`Event doesn't exist`);
    }
  }

  off(eventName, listener) {
    this.removeListener(eventName, listener);
  }

  listeners(eventName) {
    return this.events[eventName];
  }

  listenerCount(eventName) {
    return this.listeners(eventName).length;
  }

  eventNames() {
    return Object.keys(this.events);
  }

  getMaxListeners() {
    return this.maxListeners;
  }

  setMaxListeners(n) {
    if (n < 0) {
      throw Error(`Max listeners numbers can't be negative`);
    } else this.maxListeners = n;
  }
}

module.exports = EventEmitter;
