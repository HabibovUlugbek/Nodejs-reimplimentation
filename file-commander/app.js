const fs = require("node:fs/promises");

console.log("File Commander is running...");
console.log("Listening for commands in command.txt file");
console.log(
  "Available commands: create a file, delete a file, rename a file, insert to a file"
);

(async () => {
  try {
    const createFile = async (path) => {
      try {
        const existingFile = await fs.open(path, "r");
        existingFile.close();

        return console.log(`The file ${path} already exists`);
      } catch (err) {
        const newFile = await fs.open(path, "w");
        console.log(`New file created at ${path}`);
        newFile.close();
      }
    };

    const deleteFile = async (path) => {
      try {
        await fs.unlink(path);
        console.log(`The file ${path} was deleted`);
      } catch (err) {
        if (err.code === "ENOENT") {
          console.log(`The file ${path} doesn't exists`);
        } else {
          console.log(err);
        }
      }
    };

    const renameFile = async (oldPath, newPath) => {
      try {
        await fs.rename(oldPath, newPath);
        console.log(`The file ${oldPath} was renamed to ${newPath}`);
      } catch (err) {
        if (err)
          if (err.code === "ENOENT") {
            console.log(
              `The file ${oldPath} doesn't exists or ${newPath} file already exists`
            );
          } else {
            console.log(err);
          }
      }
    };

    const insertToFile = async (path, content) => {
      try {
        const existingFile = await fs.open(path, "a");
        existingFile.write(content);
        existingFile.close();
        console.log(`Content inserted to ${path}`);
      } catch (err) {
        if (err.code === "ENOENT") {
          console.log(`The file ${path} doesn't exists`);
        } else {
          console.log(err);
        }
      }
    };

    const fileName = "./command.txt";
    const commandFile = await fs.open(fileName, "r");
    const Commands = {
      CREATE_FILE: "create a file", // create a file <path>
      DELETE_FILE: "delete a file", // delete a file <path>
      RENAME_FILE: "rename a file", // rename a file <path> to <path>
      INSERT_TO_FILE: "insert to a file", // insert to a file <path> content: <content>
    };

    commandFile.on("change", async () => {
      const size = (await commandFile.stat()).size;
      const buff = Buffer.alloc(size);

      const offset = 0;
      const length = buff.byteLength;
      const position = 0;

      await commandFile.read(buff, offset, length, position);

      const commands = buff.toString().split(";");
      for (let command of commands) {
        if (!command.trim()) continue;
        if (command.includes(Commands.CREATE_FILE)) {
          const start =
            command.indexOf(Commands.CREATE_FILE) + Commands.CREATE_FILE.length;
          const path = command.substring(start).trim();
          createFile(path);
        }

        if (command.includes(Commands.DELETE_FILE)) {
          const start =
            command.indexOf(Commands.DELETE_FILE) + Commands.DELETE_FILE.length;
          const path = command.substring(start).trim();
          deleteFile(path);
        }

        if (command.includes(Commands.RENAME_FILE)) {
          const [oldPath, newPath] = command
            .replace(Commands.RENAME_FILE, "")
            .trim("")
            .split(" to ");
          renameFile(oldPath.trim(), newPath.trim());
        }

        if (command.includes(Commands.INSERT_TO_FILE)) {
          const [path, content] = command
            .replace(Commands.INSERT_TO_FILE, "")
            .trim("")
            .split(" content: ");
          insertToFile(path.trim(), content.trim());
        }
      }
    });

    const watcher = fs.watch(fileName);

    for await (const event of watcher) {
      if (event.eventType === "change") {
        commandFile.emit("change");
      }
    }
  } catch (err) {
    if (err.name === "AbortError") return;
    throw err;
  }
})();
