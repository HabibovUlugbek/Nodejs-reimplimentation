process.on("message", (msg) => {
  console.log("Message from parent:", msg);
  process.send({ foo: "bar" });
});
