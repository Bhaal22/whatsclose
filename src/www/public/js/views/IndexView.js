
define([
  'jquery',
  'underscore',
  'backbone',
  'text!/templates/mainTemplate.html',
  'views/concert_marker_view'
], function($, _, Backbone, mainTemplate, ConcertMarkerView){
  
  var MainView = Backbone.View.extend({
    el:  '#container',
    
    initialize: function (options) {
      
      //Navigation Menu Slider
      $('#search-expander').on('click',function(e){
        e.preventDefault();
        $('#search-expander').toggleClass('expanded');
        $('#expander-handle').toggleClass('glyphicon-chevron-down');
        $('#expander-handle').toggleClass('glyphicon-chevron-up');
        
        $('.search-form').toggleClass('form-expanded');
      });

      _.bindAll(this, 'render', '_initialize_map', '_onReset', '_onLocationUpdated', '_onConcertsRetrieved');
      options.vent.bind('resetMap', this._onReset);
      options.vent.bind('updateLocation', this._onLocationUpdated);
      options.vent.bind('concertsRetrieved', this._onConcertsRetrieved);
    },

    render: function () {
			var that = this;
      $(this.el).html(mainTemplate);
      
      that.map_container = {};
      that.location_marker = null;
      that.markers = [];
      that.showsCircle = null;

      that._initialize_map ();
		},
    
    _initialize_map : function() {
      var center = new google.maps.LatLng(43.580417999999995,7.125102);
      var styles = [
        {
          elementType: "geometry",
          stylers: [
            { lightness: 33 },
            { saturation: -90 }
          ]
        }
      ];

      var mapOptions = {
          zoom: 6,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          center: center,
          styles: styles
      };
      this.map_container = new google.maps.Map(document.getElementById('map-container'),
                                               mapOptions);
    },

    _onLocationUpdated : function(area){
      var marker = new google.maps.Marker({
        'map': this.map_container,
        'position': area.location,
        'icon': 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
      });

      this.map_container.setCenter(area.location);

      var regex = /\d+/;
      var match = area.radius.match(regex);

      var radius = 100;
      if (match) {
        radius = match[0];
      }

      var options = {
        strokeColor: '#0000FF',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#0000AA',
        fillOpacity: 0.05,
        map: this.map_container,
        center: area.location,
        radius: radius * 1000
      };
      this.showsCircle = new google.maps.Circle(options);

      var marker = new google.maps.Marker({
        position: area.location,
        map: self.map_container
      });

      this.location_marker = marker;
    },

    _onReset: function() {
      console.log('resetting ...');
      
      if (this.location_marker != null)
        this.location_marker.setMap(null);

      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].remove();
      }
      this.markers = [];

      if (this.showsCircle != null) {
        this.showsCircle.setMap (null);
      }

    },

    _onConcertsRetrieved: function (data) {
      var self = this;
      
      var concerts = data.concerts;
      concerts.forEach (function (concert) {

        var marker = new ConcertMarkerView({
          model: concert,
          query: data.query,
          map: self.map_container 
        });

        self.markers.push(marker);
      });
    },

	});
  return MainView;

});
