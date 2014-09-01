exports.bandNameQuery = function(bandName) {
	var query = {
		"size" : 100, // Number of results to return
		"query" : {
			"filtered" : {
				"query" : {
					"match" : {
						"bandName.exact": bandName
					}
				}
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
  var filter = "";

  if (position) {

    var geo_position = position.split(',');
    filter = {
      "geo_distance" : {
        "distance" : radius,
        "geometry" : {
          "lat" : geo_position[0],
          "lon" : geo_position[1]
        }
      }
    }
    
    return filter;
  }
  return null;
}

