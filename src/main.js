//var band2 = new require('./volbeat.js').Band();

var volbeatModule = require('./volbeat.js');

var band1 = new volbeatModule.Volbeat();

console.log('Starting bands indexer');

//console.log(band1);

console.log(band1.toString());



band1.downloadRawDates (function (concerts) {
  console.log (data);
});

