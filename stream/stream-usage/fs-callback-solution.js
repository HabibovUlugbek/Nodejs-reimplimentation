const fs = require("node:fs");

// Execution Time: 1.2s
// Memory Usage: 50MB
(async () => {
  console.time("fs callback solution");
  fs.open("test.txt", "w", (err, fd) => {
    for (let i = 0; i < 10000000; i++) {
      fs.write(fd, ` ${i} `, () => {});
    }
    console.timeEnd("fs callback solution");
  });
})();
