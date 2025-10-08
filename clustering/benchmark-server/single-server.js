const http = require("http");

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const server = http.createServer((req, res) => {
  if (req.url === "/heavy") {
    const n = 35;
    const result = fibonacci(n);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ result, message: "Work done" }));
  } else {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello from worker\n");
  }
});

server.listen(3000, () => {
  console.log(`Worker ${process.pid} started`);
  console.log("Server listening on port 3000");
});
