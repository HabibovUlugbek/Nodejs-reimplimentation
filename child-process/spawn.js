const { spawn } = require("node:child_process");

const subprocess = spawn("ll");

subprocess.stdout.on("data", (data) => {
  console.log(data.toString());
});
