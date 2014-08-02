var amqp = require('amqp');
var config = require('app-config');
var version = require("../modules/utils/version");

//declare the rabbitmq client
var rabbitMqConnection = amqp.createConnection({
    host :config.rmq.hostname,
    login : config.rmq.login,
    port: config.rmq.port,
    password : config.rmq.password,
    clientProperties: {
        product: config.settings.application.code_name,
        version : version.getFormattedVersion()
    }
});

rabbitMqConnection.on('connect', function(){
    console.log('RMQ Connection Established.');
});

rabbitMqConnection.on('close', function(){
    console.log('RMQ client connected.');
});

rabbitMqConnection.on('ready', function(){
    console.log('RMQ connection is ready.');
});

module.exports = rabbitMqConnection;

module.exports.getRabbitMqConnection = rabbitMqConnection;
