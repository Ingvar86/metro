'use strict'
var express = require('express');
var compression = require('compression')
var app = express();

var port = process.env.PORT || 8088;

app.use(compression());
app.use(express.static(__dirname + '/public'));

app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});
