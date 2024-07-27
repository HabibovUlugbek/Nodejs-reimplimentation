const fs = require("node:fs");

// Execution Time: 1.4s
// Memory Usage: 1GB
(async () => {
  console.time("fs callback solution");
  fs.open("test.txt", "w", (err, fd) => {
    for (let i = 0; i < 1000000; i++) {
      fs.write(fd, ` ${i} `, () => {});
    }
    console.timeEnd("fs callback solution");
  });
})();
