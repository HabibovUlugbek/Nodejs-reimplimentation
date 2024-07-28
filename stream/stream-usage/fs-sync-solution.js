const fs = require("node:fs");

// Execution Time: 1.8s
// Memory Usage: 40MB
(async () => {
  console.time("fs sync solution");
  fs.open("test.txt", "w", (err, fd) => {
    if (err) {
      console.error("Error opening file:", err);
      return;
    }

    for (let i = 0; i < 1000000; i++) {
      const buff = Buffer.from(` ${i} `, "utf-8");
      try {
        fs.writeSync(fd, buff);
      } catch (writeErr) {
        console.error("Error writing to file:", writeErr);
        return;
      }
    }

    console.timeEnd("fs sync solution");
  });
})();
