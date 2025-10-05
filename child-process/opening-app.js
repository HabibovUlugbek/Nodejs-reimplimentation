const { spawn } = require("node:child_process");

const subprocess = spawn("/Applications/Trello.app/Contents/MacOS/Trello"); // absolute path to the trello app executable

subprocess.stdout.on("data", (data) => {
  console.log(data.toString());
});
