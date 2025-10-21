const { Worker } = require("worker_threads");
console.log("Main thread");
new Worker("./worker.js", { workerData: "Sending something from Main thread" });
