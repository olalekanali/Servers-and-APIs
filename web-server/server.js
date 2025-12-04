const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8383;
const HOST = 'localhost';

const filePath = path.join(__dirname, "index.html")


const server = http.createServer((req, res) => {
    requestHandler(req, res);
});

function requestHandler(req, res) {
    if (req.method === 'GET' && req.url === '/index.html') {
        fs.readFile(filePath, 'utf8', (err, data) => {  
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else if (req.method === "GET" && req.url.endsWith(".html")) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Error! Page doesn't exist");
    } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Welcome to my Web Server');
    }
}


server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});

