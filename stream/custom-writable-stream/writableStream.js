const { Writable } = require("node:stream");
const fs = require("node:fs");

class WriteStream extends Writable {
  constructor({ highWaterMark, fileName }) {
    super({ highWaterMark });

    this.fileName = fileName;
    this.fileDescriptor = null;
    this.chunks = [];
    this.chunksSize = 0;
    this.writesCount = 0;
  }
  //it method runs after constructor and before starting write
  _construct(callback) {
    fs.open(this.fileName, "w", (err, fd) => {
      if (err) {
        callback(err); //exits stream and gives a error
      } else {
        this.fileDescriptor = fd;
        //no arguments means it was succesful
        callback(); // until I call this callback other metods waits me
      }
    });
  }

  _write(chunk, encoding, callback) {
    this.chunks.push(chunk);
    this.chunksSize += chunk.length;

    if (this.chunksSize >= this.writableHighWaterMark) {
      fs.write(this.fileDescriptor, Buffer.concat(this.chunks), (err) => {
        if (err) {
          return callback(err);
        }
        this.chunks = [];
        this.chunksSize = 0;
        ++this.writesCount;
        callback(); // it emits drain event
      });
    } else {
      callback();
    }
  }

  // it only called when end function called
  _final(callback) {
    fs.write(this.fileDescriptor, Buffer.concat(this.chunks), (err) => {
      if (err) {
        return callback(err);
      }
      this.chunks = [];
      this.chunksSize = 0;
      ++this.writesCount;
      callback(); //it will emit finish event and then executes destroy method
    });
  }

  _destroy(error, callback) {
    console.log("Number of writes : ", this.writesCount);
    if (this.fileDescriptor) {
      fs.close(this.fileDescriptor, (err) => {
        //if error happens never throw a error you should pass this to callback all the time
        callback(err || error);
      });
      this.fileDescriptor = null;
    } else {
      callback(error);
    }
  }
}

const stream = new WriteStream({ highWaterMark: 1800, fileName: "just.txt" });
stream.write(Buffer.from("hello"));
stream.end(Buffer.from("Good bye"));

stream.on("finish", () => {
  console.log("finished");
});
