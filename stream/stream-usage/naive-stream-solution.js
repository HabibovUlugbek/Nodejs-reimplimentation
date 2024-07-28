const fs = require("node:fs/promises");

(async () => {
  try {
    console.time("naive stream solution");
    const fileHandle = await fs.open("test.txt", "w");

    const stream = fileHandle.createWriteStream();

    for (let i = 0; i < 1000000; i++) {
      const buff = Buffer.from(` ${i} `, "utf-8");
      stream.write(buff);
    }

    stream.end(); // Close the stream

    await new Promise((resolve, reject) => {
      stream.on("finish", resolve);
      stream.on("error", reject);
    });

    console.timeEnd("naive stream solution");
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
