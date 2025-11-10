const http = require("http");

const hostname = "localhost";
const port = 3000;
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];
const server = http.createServer((req, res) => {
  console.log("request made to server");
  res.setHeader("Content-Type", "application/json");
  const url = req.url;
  if (req.method === "GET" && url === "/users") {
    res.statusCode = 200;
    return res.end(JSON.stringify(users));
  } else if (req.method === "POST" && url === "/register-user") {
    let body = "";
    req.on("data", (chunk) => {
      console.log("Received chunk:", chunk.toString());

      body += chunk.toString();
    });

    req.on("end", () => {
      const newUser = JSON.parse(body);
      users.push(newUser);
      res.statusCode = 201;
      return res.end(
        JSON.stringify({
          message: "User registered successfully",
          user: newUser,
        })
      );
    });
  } else {
    res.statusCode = 404;
    return res.end(JSON.stringify({ message: "Resouce not found" }));
  }
});
server.listen(port, hostname, () => {
  console.log("server connected on port", port);
});
