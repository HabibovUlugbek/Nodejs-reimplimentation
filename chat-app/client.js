const net = require("net");
const readline = require("readline/promises");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const client = net.createConnection(3000, "127.0.0.1", async () => {
  console.log("Connected to server");
  const username = await rl.question("Enter your username> ");

  client.write(username);
});

client.on("data", async (data) => {
  console.log(data.toString() + "\n");

  //   await writeMessage();
});

client.on("end", () => {
  console.log("Disconnected from server");
});

async function writeMessage() {
  const message = await rl.question("Enter a message> ");
  client.write(message);
  await writeMessage();
}
