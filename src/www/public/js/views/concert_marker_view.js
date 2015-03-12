//---------------------------------------
// Concert Marker View
// --------------
// The DOM element for a concert marker...
//---------------------------------------
define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
  var ConcertMarkerView = Backbone.View.extend({

    tagName:  "li",

    initialize: function(options) {
      var self = this;

      self.model = options.model;

      var concert = self.model;
      self.map = options.map;

      var myLatlng = new google.maps.LatLng(concert.geometry.lat, concert.geometry.lon);
      self.marker = new google.maps.Marker({
        map: self.map,
        position: myLatlng,
        descr : myLatlng
      });

      //to refactor
      var from = options.query.from;
      var dt = (new Date(self.model.date) - new Date()) /(1000*60*60*24);
      console.log("%s %s %s", self.model.date, from, dt)

      var content = "<h1>@" + self.model.venue + "</h1>";
      content += "<div class='date'>" + self.model.date + "</div>";
      if (dt < 0) {
        self.marker.setIcon('http://maps.google.com/mapfiles/ms/icons/yellow-dot.png');
      }
      else if ((dt >= 0) && (dt <= 7)) {
        self.marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
      }
      else if ((dt > 7) && (dt <= 14)) {
        self.marker.setIcon('http://maps.google.com/mapfiles/ms/icons/orange-dot.png');
      }
      else {
        self.marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
      }

      self.marker.infowindow = new google.maps.InfoWindow({
        content: content,
        clicked: false
      });

      google.maps.event.addListener(self.marker, 'mouseover', self.show_concert_info);
      google.maps.event.addListener(self.marker, 'mouseout', self.hide_concert_info);
      google.maps.event.addListener(self.marker, 'click', self.show_concert_detail);

      google.maps.event.addListener(self.marker.infowindow, 'closeclick', function() {
        this.clicked = !this.clicked;
      });
    },

    //---------------------------------------
    // Event handlers for marker events
    //---------------------------------------
    show_concert_detail : function(){
      this.infowindow.clicked = !this.infowindow.clicked
      if (this.infowindow.clicked) {
        this.infowindow.open(this.map, this);
      }
      else {
        this.infowindow.close();
      }
    },

    hide_concert_info : function(){
      if (! this.infowindow.clicked) {
        this.infowindow.close();
      }
    },

    show_concert_info : function(){
      if (! this.infowindow.clicked) {
        this.infowindow.open(this.map, this);
      }
    },

    render: function() { },

    remove : function(){
      this.marker.setMap(null);
      this.marker = null;
    }
  });

  return ConcertMarkerView;
});
