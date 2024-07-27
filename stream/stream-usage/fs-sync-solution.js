const fs = require("node:fs");

// Execution Time: 1.8s
// Memory Usage: 40MB
(async () => {
  console.time("fs sync solution");
  fs.open("test.txt", "w", (err, fd) => {
    for (let i = 0; i < 1000000; i++) {
      const buff = Buffer.from(` ${i} `, "utf-8");
      fs.writeSync(fd, buff);
    }

    console.timeEnd("fs sync solution");
  });
})();
