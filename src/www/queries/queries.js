exports.bandNameQuery = function(bandName) {
	var query = {
		"size" : 100, // Number of results to return
		"query" : {
			"filtered" : {
				"query" : {
					"match" : {
						"bandName": bandName
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


exports.filterQuery = function(fromDate, toDate) {

	console.log(fromDate);
	var filter = "";
	if (fromDate || toDate) {
		filter = {
			"range" : {
				"date" : {
				}
			}
		};
		
		console.log(filter);
		
		
//		"gt" : "now", // From
//		"lt" : "now+1M" // To
		if (fromDate) {
			filter.range.date.gt = new Date(fromDate);
		}
		
		console.log(filter);
		
		if (toDate) {
			filter.range.date.lt = new Date(toDate);
		}
	}
	
	return filter;
}


