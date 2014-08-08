/**
 * Searcher
 */

var config = require('app-config');
var esClient = require('./elasticsearch.client');

function Searcher() {}

module.exports.searchBandName = function (bandName, callback) {
	console.log("bandName = " + bandName);
	
	esClient.search({
	  index: config.es.index, // Index name
	  type: 'concert', // Obj type
	  fields: ["bandName", "location", "date"], // Fields to get back
	  size: 100, // Number of results to get back
	  body: {
	    query: {
	      match: {
	        "bandName": bandName
	      }
	    }
	  }
	}).then(function (resp) {
	    var hits = resp.hits.hits;
	    callback(hits); // Return hits
	}, function (err) {
	    console.trace(err.message);
	});
	
};

