const cluster = require("cluster");
const os = require("os");

if (cluster.isPrimary) {
  cluster.schedulingPolicy = cluster.SCHED_RR;
  const numCPUs = os.cpus().length;
  console.log(`Primary process ${process.pid} is running`);
  console.log(`Forking for ${numCPUs} CPUs...\n`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  require("./single-server.js");
}
