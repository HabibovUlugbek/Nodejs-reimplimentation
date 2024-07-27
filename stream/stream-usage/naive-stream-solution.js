const fs = require("node:fs/promises");

// Execution Time: 270ms
// Memory Usage: 200MB
(async () => {
  console.time("naive stream solution");
  const fileHandle = await fs.open("test.txt", "w");

  const stream = fileHandle.createWriteStream();

  for (let i = 0; i < 1000000; i++) {
    const buff = Buffer.from(` ${i} `, "utf-8");
    stream.write(buff);
  }
  console.timeEnd("naive stream solution");
})();
