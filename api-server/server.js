const http = require("http");
const { getAllItems, getOneItem, createItem, updateItem, deleteItem } = require("./controller/itemController");

const PORT = 4000;
const HOST = 'localhost';

const server = http.createServer((req, res) => {
  // GET all
  if (req.url === "/items" && req.method === "GET") return getAllItems(req, res);

  // GET one
  if (req.url.startsWith("/items/") && req.method === "GET") {
    const id = req.url.split("/")[2];
    return getOneItem(req, res, id);
  }

  // CREATE
  if (req.url === "/items" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => createItem(req, res, body));
    return;
  }

  // UPDATE
  if (req.url.startsWith("/items/") && req.method === "PUT") {
    const id = req.url.split("/")[2];
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => updateItem(req, res, id, body));
    return;
  }

  // DELETE
  if (req.url.startsWith("/items/") && req.method === "DELETE") {
    const id = req.url.split("/")[2];
    return deleteItem(req, res, id);
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ success: false, message: "Route not found" }));
});

server.listen(PORT, HOST, () => {
  console.log(`Server running at https://${HOST}:${PORT}`);
});
