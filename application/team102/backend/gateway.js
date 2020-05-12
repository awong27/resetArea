const express = require('express');
const httpProxy = require('http-proxy');
const app = express();
const port = process.env.PORT || 3004;

const apiProxy = httpProxy.createProxyServer();

apiProxy.on('error', (err, req, res) => {
  console.log(err)
  res.status(500).send('Proxy Error');
});

app.all('/fooddata', (req, res) => {
  apiProxy.web(req, res, {
    target: 'http://localhost:8080',
  });
});

app.all('/fooddata/add', (req, res) => {
  apiProxy.web(req, res, {
    target: 'http://localhost:8080',
  });
});

app.all('/api/auth/authenticate', (req, res) => {
  incrCounter();
  apiProxy.web(req, res, {
    target: 'http://localhost:3001',
  });
});

app.all('/api/auth/create', (req, res) => {
  incrCounter();
  apiProxy.web(req, res, {
    target: 'http://localhost:3001',
  });
});

app.all('/api/vision/read', (req, res) => {
  incrCounter();
  apiProxy.web(req, res, {
    target: 'http://localhost:3002',
  });
});

app.all('/api/description/get', (req, res) => {
  console.log('routing to 3006');
  apiProxy.web(req, res, {
    target: 'http://localhost:3006'
  });
});

app.all('/api/scan', (req, res) => {
  apiProxy.web(req, res, {
    target: 'http://localhost:3005'
  });
});

app.all("*", (req, res) => {
  // front end server / react
  apiProxy.web(req, res, {
    target: 'http://localhost:3000',
  });
});

app.listen(port, () => console.log(`Gateway on port ${port}!`))