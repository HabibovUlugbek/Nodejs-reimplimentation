const { CustomDuplexStream } = require("./duplexStream");

const duplex = new CustomDuplexStream({
  readFileName: "read.txt",
  writeFileName: "write.txt",
});

duplex.write(Buffer.from("this is a string 0"));
duplex.write(Buffer.from("this is a string 1\n"));
duplex.write(Buffer.from("this is a string 2"));
duplex.write(Buffer.from("this is a string 3"));
duplex.end(Buffer.from("end of write"));

duplex.on("data", (chunk) => {
  console.log(chunk.toString("utf-8"));
});
