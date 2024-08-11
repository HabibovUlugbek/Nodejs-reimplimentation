const { Duplex } = require("node:stream");
const fs = require("node:fs");

class CustomDuplexStream extends Duplex {
  constructor({
    writableHighWaterMark,
    readableHighWaterMark,
    readFileName,
    writeFileName,
  }) {
    super({ readableHighWaterMark, writableHighWaterMark });
    this.readFileName = readFileName;
    this.writeFileName = writeFileName;
    this.readFileDescriptor = null;
    this.writeFileDescriptor = null;
    this.chunks = [];
    this.chunksSize = 0;
  }

  _construct(callback) {
    fs.open(this.readFileName, "r", (err, readFd) => {
      if (err) return callback(err);
      this.readFileDescriptor = readFd;
      fs.open(this.writeFileName, "w", (err, writeFd) => {
        if (err) return callback(err);
        this.writeFileDescriptor = writeFd;
        callback();
      });
    });
  }

  _write(chunk, encoding, callback) {
    this.chunks.push(chunk);
    this.chunksSize += chunk.length;

    if (this.chunksSize > this.writableHighWaterMark) {
      fs.write(this.writeFileDescriptor, Buffer.concat(this.chunks), (err) => {
        if (err) {
          return callback(err);
        }
        this.chunks = [];
        this.chunksSize = 0;
        callback();
      });
    } else {
      // when we're done, we should call the callback function
      callback();
    }
  }

  _read(size) {
    const buff = Buffer.alloc(size);
    fs.read(this.readFileDescriptor, buff, 0, size, null, (err, bytesRead) => {
      if (err) return this.destroy(err);
      // null is to indicate the end of the stream
      this.push(bytesRead > 0 ? buff.subarray(0, bytesRead) : null);
    });
  }

  _final(callback) {
    fs.write(this.writeFileDescriptor, Buffer.concat(this.chunks), (err) => {
      if (err) return callback(err);
      this.chunks = [];
      callback();
    });
  }

  _destroy(error, callback) {
    callback(error);
  }
}

module.exports = { CustomDuplexStream };
