const cluster = require("cluster");
const numberOfCPU = require("os").availableParallelism();
if (cluster.isPrimary) {
  for (let i = 0; i < numberOfCPU; i++) {
    cluster.fork();
  }
  console.log("Parent process");
} else {
  console.log("Child process");
}
