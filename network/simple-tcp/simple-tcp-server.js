const net = require("net");

const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    console.log("Received:", data.toString());
  });
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Server is listening on", server.address());
});
