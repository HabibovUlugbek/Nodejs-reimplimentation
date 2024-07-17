const fs = require("node:fs/promises");

// Execution Time: 9.2s
// Memory Usage: 50MB
(async () => {
  console.time("fs promise solution");
  const fileHandle = await fs.open("test.txt", "w");

  for (let i = 0; i < 10000000; i++) {
    await fileHandle.write(` ${i} `);
  }
  console.timeEnd("fs promise solution");
})();
