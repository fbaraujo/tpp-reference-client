const express = require('express');
const history = require('connect-history-api-fallback');
const serveStatic = require('serve-static');

const port = process.env.PORT || 5000;
const dist = `${__dirname}/dist`;
const app = express();
app.use(history());
app.use(serveStatic(dist));
app.listen(port);
