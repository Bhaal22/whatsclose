var Q = require('q');
var es = require('elasticsearch');

var __base = './';

var mapping_file = __base + '../indexer/bootstrap/mappings/mapping.json';

var destination_index = 'whatsclose-1';
var source_index = 'whatsclose.dev';

var es_client = new es.Client ({
  host: 'localhost:9200',
  port: '9200'
});


var scroll = function (type) {
  var deferred = Q.defer ();
  es_client.search ({
    index: source_index,
    search_type: 'scan',
    type: type,
    scroll: '1m',
    body: {
      "query": { "match_all": {}},
      "size":  1000
    }
  }).then (function (res) {
    deferred.resolve(res._scroll_id);
  });

  return deferred.promise;
}

var populate_type = function (scroll_id, type) {
  es_client.scroll({
    scrollId: scroll_id,
    scroll: '30s'
  }, function (error, data) {
    console.log(error);
    console.log(data);
    console.log(data.hits.total);

    data.hits.hits.forEach(function (hit) {
      
      es_client.create({
        index: destination_index,
        type: hit._type,
        body: hit._source
      }, function(error, response) {
        console.log(response);
      });
    })
  });
}

var doit = function(type) {
  scroll (type).then(function (scroll_id) {
    console.log(scroll_id);
    
    populate_type(scroll_id, type);
  });
}


doit ('band');
doit ('concert');
doit ('multiple.concert');
