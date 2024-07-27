const fs = require("node:fs/promises");

// Execution Time: 300ms
// Memory Usage: 50MB
// Number of Writes: 1,000,000
(async () => {
  console.time("better stream solution");
  const fileHandle = await fs.open("test.txt", "w");

  const stream = fileHandle.createWriteStream();

  // stream.on("drain", () => {
  //   console.log(stream.write(Buffer.alloc(16384, "a")));
  //   console.log(stream.writableLength);

  //   console.log("We are now safe to write more!");
  // });

  let i = 0;

  const numberOfWrites = 1000000;

  const writeMany = () => {
    while (i < numberOfWrites) {
      const buff = Buffer.from(` ${i} `, "utf-8");

      // this is our last write
      if (i === numberOfWrites - 1) {
        return stream.end(buff);
      }

      i++;

      // if stream.write returns false, stop the loop
      if (!stream.write(buff)) break;
    }
  };

  writeMany();

  // resume our loop once our stream's internal buffer is emptied
  stream.on("drain", () => {
    // console.log("Drained!!!");
    writeMany();
  });

  stream.on("finish", () => {
    console.timeEnd("better stream solution");
    fileHandle.close();
  });
})();
