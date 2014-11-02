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
      //self.model.on('remove', self.remove, self);

      var concert = self.model;
      self.map = options.map;

      var myLatlng = new google.maps.LatLng(concert.geometry.lat, concert.geometry.lon);
      self.marker = new google.maps.Marker({
        map: self.map,
        position: myLatlng,
        //          animation: google.maps.Animation.DROP,
        icon : 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
        descr : myLatlng
      });

      self.marker.infowindow = new google.maps.InfoWindow({
        content: self.model.date
      });

      google.maps.event.addListener(self.marker, 'mouseover', self.show_concert_info);
      google.maps.event.addListener(self.marker, 'mouseout', self.hide_concert_info);
      google.maps.event.addListener(self.marker, 'click', self.show_concert_detail);
    },

    //---------------------------------------
    // Event handlers for marker events
    //---------------------------------------
    show_concert_detail : function(){
      this.infowindow.close();
      App.show_content();
    },

    hide_concert_info : function(){
      this.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
      this.infowindow.close();
    },

    show_concert_info : function(){
      this.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
      this.infowindow.open(this.map, this);
    },

    render: function() { },

    remove : function(){
      this.marker.setMap(null);
      this.marker = null;
    }
  });

  return ConcertMarkerView;
});
