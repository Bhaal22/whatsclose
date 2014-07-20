var volbeatModule = require('./bands/volbeat.js');

var band1 = new volbeatModule.Volbeat();

console.log('Starting bands indexer');
console.log(band1.toString());

band1.downloadRawDates (function (concerts) {
  console.log (concerts);
});

