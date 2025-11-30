require('dotenv').config();
const http = require('http');
const app = require('./src/app');
const { APP_PORT } = require('./src/config/app.config');

const port = APP_PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
