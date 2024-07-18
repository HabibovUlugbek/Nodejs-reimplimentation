const { Readable } = require("node:stream");
const fs = require("node:fs");

class ReadStream extends Readable {
  constructor({ highWaterMark, fileName }) {
    super({ highWaterMark });
    this.fileName = fileName;
    this.fileDescriptor = null;
  }

  _construct(callback) {
    fs.open(this.fileName, "r", (err, fd) => {
      if (err) {
        return callback(err);
      }
      this.fileDescriptor = fd;
      callback();
    });
  }
  // there is no callbakc because it nows state from pushing
  _read(size) {
    const buff = Buffer.alloc(size);
    fs.read(this.fileDescriptor, buff, 0, size, null, (err, bytesRead) => {
      if (err) return this.destroy(err);
      this.push(bytesRead > 0 ? buff.subarray(0, bytesRead) : null); // => why we subarraying cause maybe in buff <23 23 43 54 0 0 0 > bytesRead will be 4 here and we can remove  0s while pushing internal buffer
    });

    // this.push(null); //if you push null to read stream it means we are done reading
  }

  _destroy(error, callback) {
    if (this.fileDescriptor) {
      fs.close(this.fileDescriptor, (err) => callback(err || error));
    } else {
      callback(error);
    }
  }
}

const stream = new ReadStream({ fileName: "just.txt" });

stream.on("data", (chunk) => {
  console.log(chunk.toString());
});

stream.on("end", () => {
  console.log("Done");
});
