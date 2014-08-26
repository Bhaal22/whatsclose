
define([
  'jquery',
  'underscore',
  'backbone',
  'text!/templates/mainTemplate.html',
], function($, _, Backbone, mainTemplate){
  
  var MainView = Backbone.View.extend({
    el:  '#container',
    
    initialize: function (options) {
      _.bindAll(this, 'render', '_initialize_map', '_onLocationUpdated');
      options.vent.bind('updateLocation', this._onLocationUpdated);
    },

    render: function () {
			var that = this;
      $(this.el).html(mainTemplate);
      
      that.map_container = {};

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
          zoom: 9,
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
        'position': location
      });

      this.map_container.setCenter(location);
          
    }

	});
  return MainView;

});
