const http = require('http');
const crypto = require('crypto');

const port = process.env.PORT || 4000;
const sessions = new Map();

const users = {
  admin: { password: 'admin123', role: 'admin' }
};

function sendJson(res, code, payload) {
  res.writeHead(code, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(payload));
}

function parseBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        resolve({});
      }
    });
  });
}

function getAuthHeader(req) {
  return req.headers.authorization || '';
}

function getSession(req) {
  const token = getAuthHeader(req).replace('Bearer ', '').trim();
  return sessions.get(token);
}

const server = http.createServer(async (req, res) => {
  if (req.url === '/health' && req.method === 'GET') {
    return sendJson(res, 200, { status: 'ok', service: 'backend' });
  }

  if (req.url === '/api/auth/login' && req.method === 'POST') {
    const { username, password } = await parseBody(req);
    const user = users[username];

    if (!user || user.password !== password) {
      return sendJson(res, 401, { error: 'Invalid credentials' });
    }

    const token = crypto.randomUUID();
    sessions.set(token, { username, role: user.role, createdAt: Date.now() });

    return sendJson(res, 200, { token });
  }

  if (req.url === '/api/session' && req.method === 'GET') {
    const session = getSession(req);

    if (!session) {
      return sendJson(res, 401, { error: 'Unauthorized' });
    }

    return sendJson(res, 200, { session });
  }

  if (req.url === '/api/auth/logout' && req.method === 'POST') {
    const token = getAuthHeader(req).replace('Bearer ', '').trim();

    if (token) {
      sessions.delete(token);
    }

    return sendJson(res, 200, { message: 'Logged out' });
  }

  return sendJson(res, 404, { error: 'Not found' });
});

server.listen(port, () => {
  console.log(`backend listening on http://localhost:${port}`);
});
