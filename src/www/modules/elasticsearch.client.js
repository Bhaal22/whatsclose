/*
 * TO REMOVE
 */
var elasticSearch = require('elasticsearch');
var config = require('app-config');
var elasticSearchClient;

var _initalizeElasticSearchClient = function() {
    console.log("ES client: initializing...");
    elasticSearchClient = new elasticSearch.Client({ host: config.es.hostname + ':' + config.es.port });
    console.log("ES client: initialized.");
};

_initalizeElasticSearchClient();

module.exports = elasticSearchClient;