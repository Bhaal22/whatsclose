/*
var config = require('app-config');
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// var routes = require('./routes/index');
// var servers = require('./routes/api/servers');
// var clusters = require('./routes/api/clusters');

//var io;
var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
//app.use('/api/servers', servers);
//app.use('/api/clusters', clusters);

/// catch 404 and forward to error handler
//app.use(function(req, res, next) {
//    var err = new Error('Not Found');
//    err.status = 404;
//    next(err);
//});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports.startServer = function(port){
    var server = app.listen(port);
        io = require('socket.io').listen(server, function() {
        console.log('Express server with Socket.io listening on port ' + server.address().port);
    });
};
*/


var express = require('express');
var http = require('http');
var helpers = require('express-helpers');
var bodyParser = require('body-parser');
var searcher = require('./modules/searcher');
var path = require('path');

var app = express();
var server = http.Server(app);

console.log("setting ejs engine");
app.set('view engine', 'ejs');

app.use(bodyParser.json() );
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

console.log("setting helpers");
helpers(app);

/*
 * Index
 */
app.get('/', function(req, res) {
	res.render('index', { title: 'The index page!' });
});

/*
 * Ajax call to search band name
 */
app.post('/bandSearch', function(req, res) {
	console.log("Band Search");
	console.log("param = " + req.body.bandName);
	res.locals.title = 'Results';
	
	console.log('body: ' + JSON.stringify(req.body));
	
	var bandName = req.body.bandName;
	
	if (bandName) {
		searcher.searchBandName(bandName, function(hits) {
			console.log("app hits = " + hits);	
			res.status(201).send(hits);
		});
	} else {
		res.status(201).send('');
	}
	
});

module.exports.startServer = function(port) {
	server.listen(port, function() {
		console.log('listening on *: %s', port);
	});
};

