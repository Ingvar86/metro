'use strict'
var express = require('express');
var compression = require('compression')
var app = express();

var port = process.env.PORT || 8080;

app.use(compression());
app.use(express.static(__dirname + '/public'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});
