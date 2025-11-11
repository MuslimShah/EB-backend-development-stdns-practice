const http = require("http");
const url = require("url");

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
  const parsedUrl = url.parse(req.url, true);
  console.log("Parsed URL:", parsedUrl);
  const reqUrl = req.url;
  if (req.method === "GET" && reqUrl === "/users") {
    res.statusCode = 200;
    return res.end(JSON.stringify(users));
  } else if (req.method === "POST" && reqUrl === "/register-user") {
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
  }
  //--------------------- Get single user by id ===========
  else if (req.method === "GET" && req.url.startsWith("/single-user/")) {
    console.log("request recieved", req.url);
    const id = parseInt(req.url.split("/")[2]);
    const user = users.find((user) => user.id === id);
    if (!user) {
      res.statusCode = 404;
      return res.end(
        JSON.stringify({ message: `User not found against this id:${id}` })
      );
    } else {
      res.statusCode = 200;
      res.end(JSON.stringify(user));
    }
  }
  //---------- Get user by name using query params -------------
  else if (
    req.method == "GET" &&
    parsedUrl.pathname.startsWith("/user-by-name")
  ) {
    const name = parsedUrl.query.name;
    console.log("Query param name:", name);

    const user = users.find((user) => user.name === name);
    res.statusCode = 200;
    return res.end(JSON.stringify(user));
  } else {
    res.statusCode = 404;
    return res.end(JSON.stringify({ message: "Resouce not found" }));
  }
});
server.listen(port, hostname, () => {
  console.log("server connected on port", port);
});
