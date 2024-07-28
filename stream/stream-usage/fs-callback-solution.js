const fs = require("node:fs");

// Execution Time: 1.4s
// Memory Usage: 1GB
(async () => {
  console.time("fs callback solution");
  fs.open("test.txt", "w", (err, fd) => {
    if (err) {
      console.error("Error opening file:", err);
      return;
    }
    for (let i = 0; i < 1000000; i++) {
      fs.write(fd, ` ${i} `, (err) => {
        if (err) {
          console.error("Error writing to file:", err);
        }
      });
    }
    console.timeEnd("fs callback solution");
  });
})();
