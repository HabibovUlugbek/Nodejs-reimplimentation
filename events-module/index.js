const EventEmitter = require("./event-emitter.js");

const eventEmitter = new EventEmitter();

const eventHandler = (x) => {
  console.log("Event emitted!", x);
};

// Register the event handler function with the 'myEvent' event
eventEmitter.on("myEvent", eventHandler);
eventEmitter.on("myEvent", eventHandler);
//Checking max listeners
console.log("Before addListener:", eventEmitter.listenerCount("myEvent"));
eventEmitter.on("myEvent", eventHandler);
console.log("After addListener:", eventEmitter.listenerCount("myEvent"));

//change max listeners
console.log("Before setMaxListeners:", eventEmitter.getMaxListeners());
eventEmitter.setMaxListeners(5);
console.log("After setMaxListeners:", eventEmitter.getMaxListeners());

//Remove one listener
console.log("Before removeListener:", eventEmitter.listeners("myEvent"));
eventEmitter.removeListener("myEvent", eventHandler);
console.log("After removeListener:", eventEmitter.listeners("myEvent"));

//Remove all listeners
console.log("Before removeAllListeners:", eventEmitter.listeners("myEvent"));
eventEmitter.removeAllListeners("myEvent");
console.log("After removeAllListeners:", eventEmitter.listeners("myEvent"));

// Register the event handler function with the 'myEvent' event
eventEmitter.on("myEvent", eventHandler);
eventEmitter.on("myEvent2", eventHandler);
console.log("Event names:", eventEmitter.eventNames());

// Emit the 'myEvent' event
eventEmitter.emit("myEvent", "Hello, World!");
eventEmitter.emit("myEvent", "Hello, World!2");
eventEmitter.emit("myEvent2", "Hello, World!3");

console.log("Event names:", eventEmitter.eventNames());

//Register once listener
eventEmitter.once("onceEvent", eventHandler);

eventEmitter.emit("onceEvent", 8);
eventEmitter.emit("onceEvent", 8);

console.log(eventEmitter.listeners("onceEvent"));
