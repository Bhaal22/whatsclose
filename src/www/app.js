var express = require('express');
var http = require('http');
var helpers = require('express-helpers');
var bodyParser = require('body-parser');
var searcher = require('./modules/searcher');
var path = require('path');

global.__base = __dirname + '/';


var app = express();
var server = http.Server(app);

require('datejs');

console.log("setting ejs engine");

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true 
}));

app.use(bodyParser.json() );


app.use(express.static(path.join(__dirname, 'public')));

console.log("setting helpers");
helpers(app);


/*
 * Index
 */
app.get('/', function(req, res) {
	var params = {};
	params.title = "Whatsclose.io";
	
	searcher.getAllStyles()
		.then(function(data) {
			
      params.styles = data;

			res.render('index', params);
			
		}, function(error) {
			console.log("error: %s", error);
			
			res.render('index', params);
		});

});

var searcher = require('./modules/searcher');
var router = require('./api/api.band.js');

app.use('/api', router);

/*
 * Ajax call to search band name
 */
app.get('/bandSearch', function(req, res) {	
	searcher.search(req.query)
		.then(function(data) {
			res.send(data);
		}, function(err) {
			console.log(err);
			res.status(500).send(err);
		});
	
});

/*
 * Get ip to find geoloc ? or use geoloc api from HTML 5 ?
 */
function getClientIp(req) {
	var ipAddress;

	var forwardedIpsStr = req.header('x-forwarded-for');
	if (forwardedIpsStr) {
		var forwardedIps = forwardedIpsStr.split(',');
		ipAddress = forwardedIps[0];
	}
	if (!ipAddress) {
		ipAddress = req.connection.remoteAddress;
	}
	
	return ipAddress;
};

module.exports.startServer = function(port, hostname) {
  if (hostname === undefined)
    hostname = '127.0.0.1';

	server.listen(port, hostname, function() {
		console.log('listening on *: %s %s', hostname, port);
	});
};

