'use strict'
var express = require('express');
var app = express();

var port = process.env.PORT || 8088;
var maxAge = process.env.MaxAge || 86400;

app.disable('x-powered-by');

app.get('/sw.js', function(req, res, next) {
  res.setHeader("Cache-Control", "public, max-age=" + maxAge);
  next();
});

app.use(express.static('public'));

app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});
