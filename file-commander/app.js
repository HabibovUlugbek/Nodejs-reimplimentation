const fs = require("node:fs/promises");
const EventEmitter = require("events");

console.log("File Commander is running...");
console.log("Listening for commands in command.txt file");
console.log(
  "Available commands: create a file, delete a file, rename a file, insert to a file"
);

const fileName = "./command.txt";
const Commands = {
  CREATE_FILE: "create a file", // create a file <path>
  DELETE_FILE: "delete a file", // delete a file <path>
  RENAME_FILE: "rename a file", // rename a file <path> to <path>
  INSERT_TO_FILE: "insert to a file", // insert to a file <path> content: <content>
};
const fileCommander = new EventEmitter();

(async () => {
  try {
    const watcher = fs.watch(fileName);

    for await (const event of watcher) {
      if (event.eventType === "change") {
        fileCommander.emit("change");
      }
    }
  } catch (err) {
    if (err.name === "AbortError") return;
    throw err;
  }
})();

fileCommander.on("change", async () => {
  const commandFile = await fs.open(fileName, "r");

  const size = (await commandFile.stat()).size;
  const buff = Buffer.alloc(size);

  const offset = 0;
  const length = buff.byteLength;
  const position = 0;

  await commandFile.read(buff, offset, length, position);

  const commands = buff.toString().split(";");

  for (let command of commands) {
    if (command.trim().length === 0) continue;
    if (command.includes(Commands.CREATE_FILE)) {
      const args = parseArgs(Commands.CREATE_FILE, command);
      createFile(args[0]);
    }

    if (command.includes(Commands.DELETE_FILE)) {
      const args = parseArgs(Commands.DELETE_FILE, command);
      deleteFile(args[0]);
    }

    if (command.includes(Commands.RENAME_FILE)) {
      const [oldPath, _, newPath] = parseArgs(Commands.RENAME_FILE, command);
      renameFile(oldPath.trim(), newPath.trim());
    }

    if (command.includes(Commands.INSERT_TO_FILE)) {
      const [path, _, content] = parseArgs(Commands.INSERT_TO_FILE, command);
      insertToFile(path.trim(), content.trim());
    }
  }

  commandFile.close();
});

function parseArgs(actualCommand, commandString) {
  return commandString.replace(actualCommand, "").trim().split(" ");
}

const createFile = async (path) => {
  try {
    const existingFile = await fs.open(path, "r");
    existingFile.close();

    console.log(`The file ${path} already exists`);
  } catch (err) {
    await fs.writeFile(path, "w");
    console.log(`New file created at ${path}`);
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
