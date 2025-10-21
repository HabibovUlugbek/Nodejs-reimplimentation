const { Worker } = require("worker_threads");

const thread1 = new Worker("./worker.js");
thread1.postMessage("Easy way of talking from Main");

thread1.on("message", (msg) => {
  console.log("Data from child: ", msg);
});
