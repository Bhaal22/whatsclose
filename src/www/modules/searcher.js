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
var venue = require('../queries/queries').venue;

var serverOptions = {
	  host: process.env.ELASTICSEARCH_IP || config.es.hostname || "localhost",
	  port: process.env.ELASTICSEARCH_PORT || config.es.port || 9200
};

var elasticSearchClient = new ElasticSearchClient(serverOptions);

exports.search = function (params) {
	  var deferred = Q.defer();

	  var query = bandNameQuery(params.bandNames);
    var dateFilter = filterByDate(params.from, params.to);
    var geolocFilter = filterByGeolocation(params.location, params.radius);

    query.query.bool.must = [];

    if (dateFilter) {
        query.query.bool.must.push(dateFilter);
    }

    if (geolocFilter) {
        query.query.bool.must.push(geolocFilter);
    }

    console.dir(query);
    console.dir(query.query.bool.should);

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

exports.venue = function(id) {
	  var deferred = Q.defer();

    console.dir(venue(id));
	  elasticSearchClient.search(config.es.index, 'venue', venue(id))
		    .on('data', function(data) {
			      var json = JSON.parse(data);

			      if (json.status === 404){
				        deferred.resolve ([]);
			      } else {
                var result = json.hits.hits[0] || { _source: {}};
				        deferred.resolve(result._source);
			      }
		    })
		    .on('error', function(error) {
			      console.log(error);
			      deferred.reject(error);
		    })
		    .exec();

	  return deferred.promise;
};

exports.concerts_by_bands = function () {
    var deferred = Q.defer();
	  winston.info("concerts_by_bands");

    var query = {
        "query": {
            "match_all": {}
        },
        "aggs": {
            "by_band": {
                "terms": {
                    "field": "bandName.exact",
                    "size": 1000,
                    "order": {
                        "_term": "asc"
                    }
                }
            }
        }
    };

	  elasticSearchClient.search(config.es.index, config.es.type, query)
		    .on('data', function(data) {
			      var json = JSON.parse(data);

			      if (json.status === 404) {
				        deferred.resolve ([]);
			      } else {
                console.dir(json.aggregations.by_band.buckets);
				        deferred.resolve(json.aggregations.by_band.buckets);
			      }
		    })
		    .on('error', function(error) {
			      console.log(error);
			      deferred.reject(error);
		    })
		    .exec();

	  return deferred.promise;
};

exports.bands = function () {
    var deferred = Q.defer();
	  winston.info("get all bands");

    var query = {
        "query": {
            "match_all": {}
        },
        "sort": [
            {
                "name": {
                    "order": "asc"
                }
            }
        ]
    };

	  elasticSearchClient.search(config.es.index, 'band', query)
		    .on('data', function(data) {
			      var json = JSON.parse(data);

			      if (json.status === 404) {
				        deferred.resolve ([]);
			      } else {
                console.dir(json);
				        deferred.resolve(json.hits.hits);
			      }
		    })
		    .on('error', function(error) {
			      console.log(error);
			      deferred.reject(error);
		    })
		    .exec();
	  return deferred.promise;
};
