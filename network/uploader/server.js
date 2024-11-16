const net = require("net");
const fs = require("fs/promises");

const server = net.createServer(() => {});
let fileHandle;
let fileStream;

server.on("connection", (socket) => {
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
  const startOfFileName = filePath.lastIndexOf("/");
  const fileName =
    startOfFileName > 0 ? filePath.slice(startOfFileName) : filePath;
  return fileName;
}
