function _bandNameDSL (bandName) {
    var dsl = {
        match: { "bandName": bandName }
    };

    return dsl;
}

function _bandNamesDSL (bandNames) {
    var dsl = bandNames.map(_bandNameDSL);

    console.dir(dsl);
    return dsl;
}


exports.bandNameQuery = function(bandNames) {
	  var query = {
		    "size" : 100, // Number of results to return
				"query" : {
            "bool": {
					      "must" : [ _bandNamesDSL(bandNames) ]
            }
				}
	  };

	  return query;
};

exports.allSylesQuery = {
	  "size" : 0,
	  "aggs" : {
		    "styles" : {
			      "terms" : {
				        "field" : "style"
			      }
		    }
	  }
};

exports.venue = function(venueName) {
	  var query = {
		    "size" : 100, // Number of results to return
		    "query" : {
			      "match": {
                "name": venueName
            }
		    }
	  };
	  return query;
};

//GET /whatsclose.dev/_search?search_type=scan&scroll=1m



exports.filterByDate = function(from, to) {

	  var filter = "";
	  if (from || to) {
		    filter = {
			      "range" : {
				        "date" : {
				        }
            }
		    };

		    if (from) {
			      filter.range.date.gt = from;
		    }

		    if (to) {
			      filter.range.date.lt = to;
		    }

        return filter;
	  }

    return null;
}

exports.filterByGeolocation = function (position, radius) {
    if (position) {
        var geo_position = position.split(',');

        var filter = {
            "geo_distance" : {
                "geometry" : {
                    "lat" : geo_position[0],
                    "lon" : geo_position[1]
                }
            }
        };
        
        if ((radius === undefined) || (radius === '')) {
            return null;
        }
        else {
    	      // We test if characters are present in the radius input. If not, we add 'km' suffix.
    	      var regexp = /\D/g;
    	      if (!regexp.test(radius)){
    		        radius += 'km';
    	      }
    	      
            filter.geo_distance.distance = radius;
        }
        return filter;
    }
    
    return null;
}

