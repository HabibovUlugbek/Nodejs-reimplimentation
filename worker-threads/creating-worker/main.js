const { Worker } = require("worker_threads");
console.log("Main thread");
new Worker("./worker.js"); //path to javascript file worker.js
