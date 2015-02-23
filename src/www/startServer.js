/**
 * New node file
 */
var config = require('app-config');
var app = require('./app');

app.startServer(config.settings.web.port, config.settings.web.isHttp);

console.log("Server started");
