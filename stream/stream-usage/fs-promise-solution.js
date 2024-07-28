const fs = require("node:fs/promises");

// Execution Time: 9.3s
// Memory Usage: 50-60MB
(async () => {
  console.time("fs promise solution");
  try {
    const fileHandler = await fs.open("test.txt", "w");

    for (let i = 0; i < 1000000; i++) {
      await fileHandler.write(` ${i} `);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    console.timeEnd("fs promise solution");
  }
})();
