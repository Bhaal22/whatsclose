var volbeatModule = require('./bands/volbeat.js');
var tagadaModule = require('./bands/tagada_jones.js');

var indexerModule = require ('./bands/Indexer.js');

var band1 = new volbeatModule.Band();
var band2 = new tagadaModule.Band();

var indexer = new indexerModule.I ('concerts');

console.log('Starting bands indexer');
console.log(band1.toString());

var concertsToIndex = 0;

band1.downloadRawDates (function (concerts) {
  console.log (concerts);

  concerts.map (function (concert) {
    indexer.publish (concert);
  });

  concertsToIndex = concertsToIndex + concerts.length;
  console.log ("%d concerts to index" , concerts.length);
});

console.log(band2.toString());

band2.downloadRawDates (function (concerts) {
  console.log (concerts);
  
    concerts.map (function (concert) {
      indexer.publish (concert);
    });

  concertsToIndex = concertsToIndex + concerts.length;
  console.log ("%d concerts to index" , concerts.length);
});

console.log ("%d concerts to index" , concertsToIndex);
