process.on("message", (data) => {
  console.log("Message from parent:", data);
});

process.send(`Worker ${process.pid} says hello`);
