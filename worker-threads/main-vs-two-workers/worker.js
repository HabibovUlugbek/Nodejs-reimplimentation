const { workerData } = require("worker_threads");
const port = workerData.port;

port.on("message", (msg) => {
  console.log(`Data came from Main thread: ${msg.text}`);
});
port.postMessage({ text: `Hi from child thread` });
