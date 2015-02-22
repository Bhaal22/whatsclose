/**
 * New node file
 */
var config = require('app-config');
var app = require('./app');

app.startServer(config.settings.web.port);

console.log("Server started");
