const http = require("http");

function createNote(i) {
  return new Promise((resolve) => {
    const data = JSON.stringify({
      title: `Note ${i}`,
      content: `Content ${i}`,
    });

    const options = {
      hostname: "localhost",
      port: 3000,
      path: "/note",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": data.length,
      },
    };

    const req = http.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => resolve(JSON.parse(body)));
    });

    req.write(data);
    req.end();
  });
}

(async () => {
  const total = 1000;
  console.log(`Sending ${total} requests to /note...`);

  for (let i = 0; i < total; i++) {
    await createNote(i);
    if (i % 100 === 0) console.log(`${i} done`);
  }

  console.log("All requests done! Total requests sent:", total);
})();
