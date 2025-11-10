const http = require("http");

const hostname = "localhost";
const port = 3000;

const server = http.createServer((req, res) => {
  console.log("request made to server");
  console.log("request object", req);
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello from server");
});
server.listen(port, hostname, () => {
  console.log("server connected on port", port);
});
