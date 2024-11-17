const net = require("net");
const fs = require("fs/promises");
const path = require("path");

const server = net.createServer(() => {});

server.on("connection", (socket) => {
  let fileHandle;
  let fileStream;
  console.log("New connection");

  socket.on("data", async (data) => {
    //check for name
    if (!fileHandle) {
      socket.pause(); //to not getting another chunk while opening the file
      const fileName = checkForFileName(data);
      fileHandle = await fs.open(`store/${fileName}`, "w");
      fileStream = fileHandle.createWriteStream();
      // fileStream.write(data);

      socket.resume(); //continue to resuming data
      fileStream.on("drain", () => {
        socket.resume();
      });
    } else {
      if (!fileStream.write(data)) {
        socket.pause();
      }
    }
  });

  socket.on("end", () => {
    fileHandle.close();
    fileHandle = null;
    fileStream = null;
    console.log("Connection closed");
  });
});

server.listen(4000, "::1", () => {
  console.log("Uploader server running on ", server.address());
});

function checkForFileName(data) {
  const { filePath } = JSON.parse(data);
  return path.basename(filePath);
}
