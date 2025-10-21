const { Worker, workerData, MessageChannel } = require("worker_threads");
const channel = new MessageChannel();
const port1 = channel.port1;
const port2 = channel.port2;

const worker1 = new Worker("./worker.js", {
  workerData: { port: port1 },
  transferList: [port1],
});
const worker2 = new Worker("./worker.js", {
  workerData: { port: port2 },
  transferList: [port2],
});
