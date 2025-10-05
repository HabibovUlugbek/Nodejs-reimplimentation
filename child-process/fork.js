const { fork } = require("child_process");

const child = fork("child.js");

child.on("message", (msg) => {
  console.log("Message from child", msg);
});

child.send({ hello: "world" });
