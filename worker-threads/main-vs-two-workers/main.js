const { Worker, MessageChannel } = require("worker_threads");
const channel1 = new MessageChannel();
const mainToWorkerOne = channel1.port1;
const workerOnePort = channel1.port2;

const channel2 = new MessageChannel();
const mainToWorkerTwo = channel2.port1;
const workerTwoPort = channel2.port2;

mainToWorkerOne.postMessage({ text: "Message from main thread to worker 1" });
mainToWorkerOne.on("message", (msg) => {
  console.log(`Worker 1 msg : ${msg.text}`);
});

mainToWorkerTwo.postMessage({ text: "Message from main thread to worker 2" });

mainToWorkerTwo.on("message", (msg) => {
  console.log(`Worker 1  msg : ${msg.text}`);
});

const worker1 = new Worker("./worker.js", {
  workerData: { port: workerOnePort },
  transferList: [workerOnePort],
});
const worker2 = new Worker("./worker.js", {
  workerData: { port: workerTwoPort },
  transferList: [workerTwoPort],
});
