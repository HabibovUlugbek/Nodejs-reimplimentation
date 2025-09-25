const { stdin, stderr, stdout } = require("node:process");

stdin.on("data", (data) => {
  console.log("Stdin", data.toString("utf8"));
});
stdout.write("This is some text I want ");
stderr.write("Hello I'm bug");
