/**
 * Searcher
 */

var config = require('app-config');
var Q = require('q');
var ElasticSearchClient = require('elasticsearchclient');
var winston = require ('winston');

var bandNameQuery = require('../queries/queries').bandNameQuery;
var allSylesQuery = require('../queries/queries').allSylesQuery;
var filterByDate = require('../queries/queries').filterByDate;
var filterByGeolocation = require('../queries/queries').filterByGeolocation;

var serverOptions = {
	host: config.es.hostname,
	port: config.es.port
};

var elasticSearchClient = new ElasticSearchClient(serverOptions);

exports.search= function (params) {
	var deferred = Q.defer();
	
	var query = bandNameQuery(params.bandName);
  var dateFilter = filterByDate(params.from, params.to);
  var geolocFilter = filterByGeolocation(params.location, params.radius);
  
  query.filter = {
    "bool" : {
      "must": []
    }
  }

  if (dateFilter) {
    query.filter.bool.must.push(dateFilter);
  }

  if (geolocFilter) {
    query.filter.bool.must.push(geolocFilter);
  }


	elasticSearchClient.search(config.es.index, config.es.type, query)
    .on('data', function(data) {
	    
		  var json = JSON.parse(data);
	    
      console.log(json.status);
      console.log(json);
		  if ((json.status === 404) || (json.status === 400)) {
			  deferred.resolve([]);
		  } else {
			  deferred.resolve(json.hits.hits);
		  }
	  }).on('error', function(err) {
		  console.log(err);
		  reject(err);
	  }).exec();
	
	return deferred.promise;
};

exports.getAllStyles = function() {
	var deferred = Q.defer();
	winston.info(allSylesQuery);
	
	elasticSearchClient.search(config.es.index, config.es.type, allSylesQuery)
		.on('data', function(data) {
			var json = JSON.parse(data);

			if (json.status === 404) {
				deferred.resolve ([]);
			} else {
				deferred.resolve(json.aggregations.styles.buckets);
			}
		})
		.on('error', function(error) {
			console.log(error);
			deferred.reject(error);
		})
		.exec();
	
	return deferred.promise;
};
