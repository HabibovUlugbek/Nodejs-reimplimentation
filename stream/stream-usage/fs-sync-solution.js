// Execution Time: 1.8s
// Memory Usage: 32MB
const fs = require("node:fs");

(async () => {
  console.time("fs sync solution");
  fs.open("test.txt", "w", (err, fd) => {
    for (let i = 0; i < 10000000; i++) {
      const buff = Buffer.from(` ${i} `, "utf-8");
      fs.writeSync(fd, buff);
    }

    console.timeEnd("fs sync solution");
  });
})();
