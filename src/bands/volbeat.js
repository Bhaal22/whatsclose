var band = require('./Band.js');

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

Volbeat.prototype = new band.Band();
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
  Volbeat: Volbeat
};
