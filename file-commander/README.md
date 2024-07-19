# File Commander

The File Commander project demonstrates how to use the `fs` module in Node.js to perform file operations based on commands specified in a command text file.

## Usage

1. Create a `command.txt` file with the desired file operations. Each command should be separated by a `;` character.

   Example `commands.txt` file:

   ```
   create a file newfile.txt;rename a file oldfile.txt to newfile.txt;delete a file oldfile.txt
   ```

2. Run the `app.js` script using Node.js.

3. The script will read the command text file and execute the corresponding file operations.

## Command Syntax

The command syntax for the command text file is as follows:

- `create a file <path>`: Creates a new file with the specified filename.
- `delete a file <path>`: Deletes the file with the specified filename.
- `rename a file <path> to <path>`: Renames a file from the old name to the new name.
- `insert to a file <path> content: <content>`: Inserts content into a file. If the file does not exist, it will be created.

## Example

Suppose you have the following `commands.txt` file:

```
create a file newfile.txt;rename a file oldfile.txt to newfile.txt;delete a file oldfile.txt
```

Running the `app.js` script will create a new file named `newfile.txt`, rename `oldfile.txt` to `newfile.txt`, and delete `oldfile.txt`.

Feel free to explore the file commander and customize it according to your needs.

For more information on the `fs` module and its usage, please refer to the [Node.js documentation](https://nodejs.org/api/fs.html).
