const { workerData } = require("worker_threads");
console.log("Data came from parent:", workerData);
