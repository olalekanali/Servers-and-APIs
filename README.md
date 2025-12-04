# **Node.js CRUD API + Static Web Server**

## Project Overview

This project contains **two separate Node.js servers**:

1. **Web Server (`web-server/`)**
   A minimal HTTP server that serves a static `index.html` file.

2. **API Server (`api-server/`)**
   A simple CRUD API built with Node.js (without Express).
   It manages items stored in a local `items.json` file and exposes routes for creating, reading, updating, and deleting items.


---

## Project Structure

```
root/
│
├── api-server/
│   ├── controller/
│   │   └── itemController.js     # All CRUD logic
│   ├── items.json                # Local JSON data storage
│   ├── server.js                 # API server routes
│   └── package.json
│
└── web-server/
    ├── index.html                # Static webpage
    ├── server.js                 # Web server serving the HTML file
    └── package.json
```

---
# 🧩 Web Server (Static HTML)

### Start the Web Server

```bash
cd web-server
node server.js
```

### URL:

```
http://localhost:8383
```

The server simply reads and returns the `index.html` file and returns an error when you try to access `{random}.html`

---
# 🧩 API Server (CRUD)

### Start the API Server

```bash
cd api-server
node server.js
```

### API Base URL

```
http://localhost:4000
```

---

# 📚 API Endpoints

## ✔️ 1. Get All Items

**GET** `/items`

### Response:

```json
{
  "success": true,
  "data": [ ... ]
}
```


## ✔️ 2. Get Single Item

**GET** `/items/:id`

### Response (if found):

```json
{
  "success": true,
  "data": { ... }
}
```


## ✔️ 3. Create Item

**POST** `/items`

### Request Body:

```json
{
  "name": "Rice",
  "price": 2500,
  "size": "Medium"
}
```


## ✔️ 4. Update Item

**PUT** `/items/:id`

### Body (fields are optional):

```json
{
  "price": 3000
}
```


## ✔️ 5. Delete Item

**DELETE** `/items/:id`

### Response:

```json
{
  "success": true,
  "message": "Item deleted"
}
```


# 📦 Installation Guide

1. Clone the project:

```bash
git clone <this-repo-url>
```

2. Install dependencies (optional since servers use raw Node):

```bash
cd api-server
npm install
```

Same for web-server if needed.

---

# 🧪 Testing the API

You can test the CRUD endpoints using:

* **Thunder Client (VSCode)**


---

# 📌 Notes

* This project does **not** use Express — everything is implemented manually.
* `items.json` acts as a simple data store (like a tiny local database).
* Both servers run independently.
* Perfect for learning Node.js fundamentals.
