const { FileReadStream } = require("./readableStream");

const stream = new FileReadStream({ fileName: "input.txt" });

stream.on("data", (chunk) => {
  console.log(chunk.toString());
});

stream.on("end", () => {
  console.log("Stream is done reading the file");
});
