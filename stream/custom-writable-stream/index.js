const { FileWritableStream } = require("./writableStream.js");

const stream = new FileWritableStream({
  highWaterMark: 1800,
  fileName: "output.txt",
});
stream.write(Buffer.from("Hello from the other side"));
stream.end(Buffer.from(" Good bye my custom writable stream"));

stream.on("finish", () => {
  console.log("finished");
});
