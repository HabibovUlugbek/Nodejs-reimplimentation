const net = require("net");
const fs = require("fs/promises");

const socket = net.createConnection({ host: "::1", port: "4000" }, async () => {
  const filePath = "info.txt";
  const fileHandle = await fs.open(filePath, "r");
  const fileStream = fileHandle.createReadStream();

  //Reading from source file
  fileStream.on("data", (data) => {
    socket.write(data);
  });

  fileStream.on("end", () => {
    console.log("File succesfully uploaded");
    fileHandle.close();
    socket.end();
  });
});