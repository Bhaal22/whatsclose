var http = require('http');
var env = require('jsdom').env;

function Band() {
  this.url = '';
  this.datesPath = '';
  this.name = '';
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

function Concert(date, location) {
  this.date = date;
  this.location = location;
}


function Volbeat() {
  this.url = 'http://www.volbeat.dk';
  this.datesPath = '/3/dates/';
  this.name = 'Volbeat';
  this.concerts = [];
}

Volbeat.prototype = new Band();
Volbeat.prototype.extract_concert_information = function ($) {
  var dates_table = $('table.dates_list');
  
  var rows = $ ('.dates_list > tr');
  var band = this;
  rows.each (function (index) {

    var date = $('td.dates_date', this).text ();
    var location = $('td.dates_info2', this).text ();

    band.concerts.push (new Concert (new Date (date), location));
  });
}

module.exports = {
  Band: Band,
  Volbeat: Volbeat,
  Concert: Concert
};
