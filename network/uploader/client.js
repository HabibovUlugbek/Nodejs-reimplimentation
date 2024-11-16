const net = require("net");
const fs = require("fs/promises");
const readline = require("readline/promises");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const socket = net.createConnection({ host: "::1", port: "4000" }, async () => {
  let filePath;
  let fileHandle;

  const ask = async () => {
    try {
      filePath = await rl.question("Enter a file path you want to upload : ");
      fileHandle = await fs.open(filePath, "r");
    } catch (error) {
      if (error.code === "ENOENT") {
        console.log("In the given path file not found!!!");
        await ask();
      }
    }
  };

  if (!filePath || !fileHandle) {
    await ask();
  }

  //sending filename
  socket.write(JSON.stringify({ filePath }));

  const fileStream = fileHandle.createReadStream();

  //Reading from source file
  fileStream.on("data", (data) => {
    if (!socket.write(data)) {
      fileStream.pause();
    }
  });

  socket.on("drain", () => {
    fileStream.resume();
  });

  fileStream.on("end", () => {
    console.log("File succesfully uploaded");
    // filePath = null;
    fileHandle.close();
    socket.end();
  });
});
