const net = require("net");

const server = net.createServer();

const clients = [];

server.on("connection", (socket) => {
  console.log("New connection!!!");

  socket.on("data", (data) => {
    clients.map((s) => {
      s.write(data);
    });
  });

  clients.push(socket);
});

// server.on("data", (data) => {
//   console.log(data.toString());
// });

server.listen(3000, "127.0.0.1", () => {
  console.log("Server address:", server.address());
});
