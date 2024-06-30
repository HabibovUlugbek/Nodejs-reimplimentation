# Event Emitter

This is a simple implementation of an event emitter module in Node.js. The event emitter allows you to create and manage custom events in your applications.

## Usage

```javascript
const EventEmitter = require("./event-emitter");

const emitter = new EventEmitter();

emitter.on("greet", () => {
  console.log("Hello, world!");
});

emitter.emit("greet");
```

## API

### `on(event, listener)`

Adds a listener to the specified event.

- `event` (String): The name of the event.
- `listener` (Function): The callback function to be executed when the event is emitted.

### `addListener(event, listener)`

Alias for `on`.

### `emit(event, [...args])`

Emits the specified event.

- `event` (String): The name of the event.
- `args` (Any): Optional arguments to be passed to the event listeners.

### `off(event, listener)`

Removes a listener from the specified event.

- `event` (String): The name of the event.
- `listener` (Function): The callback function to be removed from the event.

### `once(event, listener)`

Adds a one-time listener to the specified event.

- `event` (String): The name of the event.
- `listener` (Function): The callback function to be executed only once when the event is emitted.

### `removeAllListeners(event)`

Removes all listeners from the specified event.

- `event` (String): The name of the event.

### `removeListener(event, listener)`

Alias for `off`.

## `listeners(event)`

Returns an array of listeners for the specified event.

- `event` (String): The name of the event.

## `listenerCount(event)`

Returns the number of listeners for the specified event.

- `event` (String): The name of the event.

## `eventNames()`

Returns an array of event names.

## `setMaxListeners(n)`

Sets the maximum number of listeners that can be added to an event.

- `n` (Number): The maximum number of listeners.

## `getMaxListeners()`

Returns the maximum number of listeners that can be added to an event.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
