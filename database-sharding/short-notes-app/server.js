const http = require("http");
const { createNote, getNote, removeNode } = require("./note-handler");
const { initShards } = require("./db/shard-config");

(async () => {
  await initShards();

  const server = http.createServer((req, res) => {
    if (req.method === "POST" && req.url === "/note") {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", () => createNote(req, res, body));
    } else if (req.method === "GET" && req.url.startsWith("/note/")) {
      const id = req.url.split("/")[2];
      getNote(req, res, id);
    } else if (req.method === "POST" && req.url === "/debug/remove-node") {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", () => removeNode(req, res, body));
    } else {
      res.writeHead(404);
      res.end("Not found");
    }
  });

  server.listen(3000, () =>
    console.log("Server running on http://localhost:3000")
  );
})();
