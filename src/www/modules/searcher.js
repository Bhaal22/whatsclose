/**
 * Searcher
 */

var config = require('app-config');
var ElasticSearchClient = require('elasticsearchclient');
var Promise = require('es6-promise').Promise;

var serverOptions = {
	host: config.es.hostname,
	port: config.es.port
};

var elasticSearchClient = new ElasticSearchClient(serverOptions);

exports.searchBandName = function (bandName) {
	return new Promise(function(resolve, reject) {
		
		console.log("search band name : " + bandName);
		
		var qryObj = {
			"fields" : ["bandName", "location", "date"], // Fields to return
			"size" : 100, // Number of results to return
			"query" : {
				"term" : {"bandName": bandName}
			}
		};
		
		elasticSearchClient.search(config.es.index, config.es.type, qryObj).
			on('data', function(data) {
				console.log(data);
				resolve(JSON.parse(data).hits.hits);
			})
			.on('error', function(err) {
				console.log(err);
				reject(err);
			})
			.exec();
		
	});
	
};


