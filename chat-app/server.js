const net = require("net");
const crypto = require("crypto");

const server = net.createServer();

const clients = {};

server.on("connection", (socket) => {
  const clientId = crypto.randomBytes(16).toString("hex");

  Object.values(clients).map((s) => {
    s.write(`New user connected: ${clientId}`);
  });

  socket.write(`Your ID is: ${clientId}`);
  clients[clientId] = socket;

  socket.on("data", (data) => {
    const parsedData = JSON.parse(data);
    Object.values(clients).map((s) => {
      s.write(`${parsedData.clientId}: ${parsedData.message}\n`);
    });
  });

  socket.on("end", () => {
    handleClientLeave(clientId);
  });

  socket.on("error", () => {
    handleClientLeave(clientId);
  });
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Server address:", server.address());
});

const handleClientLeave = (clientId) => {
  delete clients[clientId];
  Object.values(clients).map((s) => {
    s.write(`User disconnected: ${clientId}`);
  });
};
