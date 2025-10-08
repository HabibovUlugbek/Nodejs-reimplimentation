const cluster = require("cluster");
const nmbCPU = require("os").availableParallelism();

const workers = [];
if (cluster.isPrimary) {
  for (let i = 0; i < nmbCPU; i++) {
    const worker = cluster.fork();
    workers.push(worker);
    worker.send("something send from parent");
  }
  cluster.on("exit", (worker, code, signal) => {
    cluster.fork();
  });
  console.log("Parent process");
} else {
  require("./worker");
}

cluster.on("message", (worker, msg) => {
  console.log(`Message from worker ${worker.process.pid} :`, msg);
});

cluster.on("listening", (worker, address) => {
  console.log(
    `A worker with ${worker.pid} id  is now connected to ${address.address}:${address.port}`
  );
});
