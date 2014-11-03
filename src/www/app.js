var express = require('express');
var http = require('http');
var helpers = require('express-helpers');
var bodyParser = require('body-parser');
var searcher = require('./modules/searcher');
var path = require('path');

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

var router = express.Router();



/*
 * Index
 */
app.get('/', function(req, res) {
	var params = {};
	params.title = "Whatsclose.io";
	
	searcher.getAllStyles()
		.then(function(data) {
			
      params.styles = data;

			res.render('index2', params);
			
		}, function(error) {
			console.log("error: %s", error);
			
			res.render('index2', params);
		});

});

var searcher = require('./modules/searcher');

router.route('/bands')
  .get (function (req, res) {
    var p = searcher.concerts_by_bands();
    p.then (function (concerts_by_band) {

      searcher.bands().then (function (bands) {

        var json = bands.map(function (band) {

          var b = band._source; 
          var o = concerts_by_band.filter(function(pair) {
            return pair.key == b.name;
          });

          if (o[0] != null) {
            b.count = o[0].doc_count;
          }
          else
            b.count = 0;
          return b;

        });

        res.json (json);
      });
    });
  });

router.route('/concerts')
  .get (function (req, res) {
    var params = {
      bandName: req.query.bandName,
      from: req.query.from,
      to: req.query.to,
      location: req.query.location,
      radius: req.query.radius
    };

    var p = searcher.search(params);
    p.then (function (data) {
      var jsonout = data.map (function (concert) {
        return concert._source;
        });

      res.json (jsonout);
    });
  });

router.route('/styles')
  .get (function (req, res) {
    var p = searcher.getAllStyles();

    p.then (function (data) {
      res.json(data);
    });
  })
  .post (function (req, res) {

    var params = {
      styles: req.body.styles,
      fromDate: req.body.fromDate,
      toDate: req.body.toDate
    };
  });

router.route('/version')
  .get(function(req, res) {
    res.json({version: '0.2'});
  });

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

