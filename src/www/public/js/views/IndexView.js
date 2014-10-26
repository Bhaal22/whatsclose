
define([
  'jquery',
  'underscore',
  'backbone',
  'text!/templates/mainTemplate.html',
], function($, _, Backbone, mainTemplate){
  
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
      that.markers = [];


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

    _onLocationUpdated : function(location){
      var marker = new google.maps.Marker({
        'map': this.map_container,
        'position': location,
        'icon': 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
      });

      this.map_container.setCenter(location);

      var showsCircle;
      var options = {
        strokeColor: '#0000FF',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#0000AA',
        fillOpacity: 0.05,
        map: this.map_container,
        center: location,
        radius: 500 * 1000
      };
      showsCircle = new google.maps.Circle(options);

      var marker = new google.maps.Marker({
        position: location,
        map: self.map_container
      });

      this.markers.push(marker);
    },

    _onReset: function() {
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }

    },

    _onConcertsRetrieved: function (concerts) {
      var self = this;
      concerts.forEach (function (concert) {

        var myLatlng = new google.maps.LatLng(concert.geometry.lat, concert.geometry.lon);
        var marker = new google.maps.Marker({
          'map': self.map_container,
          'position': myLatlng,
          'descr': myLatlng,
          'icon': 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
        });

        google.maps.event.addListener(marker, 'click', self.show_concert_detail);

        self.markers.push(marker);
      });
    },

    show_concert_detail: function () {
      alert('toto');
    }

	});
  return MainView;

});
