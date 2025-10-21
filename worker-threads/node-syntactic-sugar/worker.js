const { parentPort } = require("worker_threads");

parentPort.postMessage("Hi again from child");
parentPort.on("message", (msg) => {
  console.log("Data from main : ", msg);
});
