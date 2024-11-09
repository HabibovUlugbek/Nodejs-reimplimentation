const net = require("net");
const fs = require("fs/promises");

const server = net.createServer(() => {});
let fileHandle;

server.on("connection", (socket) => {
  console.log("New connection");

  socket.on("data", async (data) => {
    fileHandle = await fs.open("store/result.txt", "w");
    const fileStream = fileHandle.createWriteStream();
    fileStream.write(data);
  });

  socket.on("end", () => {
    console.log("Connection closed");
    fileHandle.close();
  });
});

server.listen(4000, "::1", () => {
  console.log("Uploader server running on ", server.address());
});
