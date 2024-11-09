const net = require("net");
const readline = require("readline/promises");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const clearLine = (dir) => {
  return new Promise((resolve, reject) => {
    process.stdout.clearLine(dir, () => {
      resolve();
    });
  });
};

const moveCursor = (dx, dy) => {
  return new Promise((resolve, reject) => {
    process.stdout.moveCursor(dx, dy, () => {
      resolve();
    });
  });
};

let clientId = "";

const client = net.createConnection(3000, "127.0.0.1", async () => {
  console.log("Connected to server");

  const ask = async () => {
    const message = await rl.question("Enter a message> ");
    await moveCursor(0, -1);
    await clearLine(0);
    client.write(formatMessage(message));
  };

  ask();

  client.on("data", async (data) => {
    console.log(); // helps to be at next line
    await moveCursor(0, -1);
    await clearLine(0);
    if (data.toString().includes("Your ID is:")) {
      clientId = data.toString().split(":")[1].trim();
      console.log(`Your ID is: ${clientId}`);
    } else {
      console.log(data.toString());
    }

    ask();
  });
});

client.on("end", () => {
  console.log("Disconnected from server");
});

const formatMessage = (message) => {
  return JSON.stringify({
    clientId,
    message: message.trim(),
  });
};
