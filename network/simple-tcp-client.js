const net = require("net");

const socket = net.createConnection(3000, "127.0.0.1", () => {
  console.log("Connected to server!");
  socket.write("Hello, server!");
});
