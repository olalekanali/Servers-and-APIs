const fs = require("fs");
const path = require("path");
const { randomUUID } = require("crypto");

const filePath = path.join(__dirname, "..", "items.json");

function readItems() {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data || "[]");
  } catch {
    return [];
  }
}

function writeItems(items) {
  fs.writeFileSync(filePath, JSON.stringify(items, null, 2));
}


exports.getAllItems = (req, res) => {
  const items = readItems();

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ success: true, data: items }));
};

exports.getOneItem = (req, res, id) => {
  const items = readItems();
  const item = items.find((i) => i.id === id);

  if (!item) {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ success: false, message: "Item not found" }));
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ success: true, data: item }));
};

exports.createItem = (req, res, body) => {
  const { name, price, size } = JSON.parse(body);

  if (!name || !price || !size) {
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ success: false, message: "Missing fields" }));
  }

  const items = readItems();
  const newItem = { id: randomUUID(), name, price, size };

  items.push(newItem);
  writeItems(items);
  
  res.writeHead(201, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ success: true, data: newItem }));
};

exports.updateItem = (req, res, id, body) => {
  const items = readItems();
  const itemIndex = items.findIndex((i) => i.id === id);

  if (itemIndex === -1) {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ success: false, message: "Item not found" }));
  }

  const updates = JSON.parse(body);
  items[itemIndex] = { ...items[itemIndex], ...updates };

  writeItems(items);

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ success: true, data: items[itemIndex] }));
};

exports.deleteItem = (req, res, id) => {
  const items = readItems();
  const filtered = items.filter((i) => i.id !== id);

  writeItems(filtered);

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ success: true, message: "Item deleted" }));
};
