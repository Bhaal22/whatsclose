var http = require('http');
var env = require('jsdom').env;

function Band() {
  this.url = '';
  this.datesPath = '';
  this.name = '';
  this.style = [];

  this.last_indexed = new Date ();
}

Band.prototype.toString = function () {
  return 'Band:' + this.name + '(' + this.url + this.datesPath + ')';
}

Band.prototype.getRawConcertInformation = function (data, callback) {
  var band = this;
  env(data, function (errors, window) {
    if (errors != null)
      console.log(errors);
    
    var $ = require('jquery')(window);
    band.extract_concert_information ($);

    callback (band.concerts);
  });
}

Band.prototype.downloadRawDates = function (callback) {
  var url = this.url + this.datesPath;
  var band = this;

  console.log('Fetching data from %s', url);
  http.get(url, function (res) {
    var data = "";
    res.on('data', function (chunk) {
      data += chunk;
    });
    
    res.on('end', function () {
      band.getRawConcertInformation (data, callback);

    });
  }).on('error', function() {
    console.log('error');
  });
}

module.exports = {
  Band: Band
};
