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
  let fileSize;

  let uploadedPercentage = 0;
  let bytesUploaded = 0;

  const ask = async () => {
    try {
      filePath = await rl.question("Enter a file path you want to upload : ");
      fileHandle = await fs.open(filePath, "r");
      fileSize = (await fileHandle.stat()).size;
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
  fileStream.on("data", async (data) => {
    if (!socket.write(data)) {
      fileStream.pause();
    }
    bytesUploaded += data.length;
    uploadedPercentage = Math.floor((bytesUploaded / fileSize) * 100);
    await moveCursor(0, -1);
    await clearLine(0);
    console.log(
      `Uploaded ${uploadedPercentage} % (${Math.floor(
        bytesUploaded / 1024 / 1024
      )} MB) of file`
    );
  });

  socket.on("drain", () => {
    fileStream.resume();
  });

  fileStream.on("end", () => {
    console.log("File succesfully uploaded");
    fileHandle.close();
    socket.end();
  });
});

const clearLine = (dir) => {
  return new Promise((resolve, reject) => {
    process.stdout.clearLine(dir, () => {
      resolve();
    });
  });
};

const moveCursor = (dx, dy) => {
  return new Promise((resolve, reject) => {
    process.stdout.moveCursor(dx, dy, () => {
      resolve();
    });
  });
};
