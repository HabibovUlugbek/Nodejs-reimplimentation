const { Worker, MessageChannel } = require("worker_threads");
const channel = new MessageChannel();
const mainToWorker = channel.port1;
const workerPort = channel.port2;

mainToWorker.postMessage({ text: "Message from main thread to worker " });
mainToWorker.on("message", (msg) => {
  console.log(`Worker  msg : ${msg.text}`);
});

new Worker("./worker.js", {
  workerData: { port: workerPort },
  transferList: [workerPort],
});
