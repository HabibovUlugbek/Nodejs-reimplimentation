const fs = require("node:fs/promises");

// Execution Time: 245ms
// Memory Usage: 30MB
(async () => {
  console.time("better stream solution");
  try {
    const fileHandle = await fs.open("test.txt", "w");

    const stream = fileHandle.createWriteStream();

    let i = 0;

    const numberOfWrites = 1000000;

    const writeMany = () => {
      while (i < numberOfWrites) {
        const buff = Buffer.from(` ${i} `, "utf-8");

        if (i === numberOfWrites - 1) {
          return stream.end(buff);
        }

        i++;

        if (!stream.write(buff)) break;
      }
    };

    writeMany();

    stream.on("drain", () => {
      writeMany();
    });

    stream.on("finish", () => {
      fileHandle.close();
      console.timeEnd("better stream solution");
    });
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
