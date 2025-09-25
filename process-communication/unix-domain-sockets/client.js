const net = require("net");
const socketPath = "/tmp/mysocket.sock";

const client = net.createConnection({ path: socketPath }, () => {
  console.log("Connected to server");
  client.write("Hello from Node.js client!");
});

client.on("data", (data) => {
  console.log("Received from server:", data.toString());
  client.end();
});

client.on("end", () => {
  console.log("Disconnected from server");
});

client.on("error", (err) => {
  console.error("Socket error:", err.message);
});
