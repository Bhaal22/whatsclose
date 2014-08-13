exports.bandNameQuery = function(bandName) {
	var query = {
		"fields" : ["bandName", "location", "date", "geometry"], // Fields to return
		"size" : 100, // Number of results to return
		"query" : 
		{
			"term" : 
			{
				"bandName": bandName
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