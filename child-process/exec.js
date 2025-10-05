const { exec } = require("child_process");

exec("ls -l", (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout:\n${stdout}`);
  console.error(`stderr:\n${stderr}`);
});
