
// server.js — минимальный Node.js сервер для отдачи статических файлов и API
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

function sendFile(res, filePath, contentType, code = 200) {
  fs.readFile(filePath, function(err, data) {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 — Internal Server Error');
      return;
    }
    res.writeHead(code, { 'Content-Type': contentType });
    res.end(data);
  });
}

function serveStatic(req, res) {
  let parsed = url.parse(req.url);
  let pathname = parsed.pathname;

  // serve index.html for root
  if (pathname === '/') {
    sendFile(res, path.join(PUBLIC_DIR, 'index.html'), 'text/html');
    return true;
  }

  // prevent directory traversal
  const safePath = path.normalize(path.join(PUBLIC_DIR, pathname));
  if (!safePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 — Forbidden');
    return true;
  }

  if (fs.existsSync(safePath) && fs.statSync(safePath).isFile()) {
    const ext = path.extname(safePath).toLowerCase();
    const mime = {
      '.html': 'text/html',
      '.js': 'application/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.svg': 'image/svg+xml',
      '.ico': 'image/x-icon'
    }[ext] || 'application/octet-stream';
    sendFile(res, safePath, mime);
    return true;
  }

  return false;
}

function handleApi(req, res) {
  const parsed = url.parse(req.url, true);
  if (req.method === 'GET' && parsed.pathname === '/api/cars') {
    // Пример динамически генерируемых данных — в реальности может быть БД
    const cars = [
      { id: 1, name: 'Chevrole', mark: "Cobalt", year: 2020, price: 12500 },
      { id: 2, name: 'Porsche', mark: "911 TS", year: 2023, price: 250000 },
      { id: 3, name: 'BMW', mark: "M5", year: 2020, price: 150000 },
      { id: 4, name: 'Ferrari', mark: "488 Pista", year: 2018, price: 350000 }
    ];

    const response = JSON.stringify(cars);
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store'
    });
    res.end(response);
    return true;
  }
  return false;
}

const server = http.createServer((req, res) => {
  // First — API
  if (handleApi(req, res)) return;

  // Then — static files
  if (serveStatic(req, res)) return;

  // Not found
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('404 — Not Found');
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

