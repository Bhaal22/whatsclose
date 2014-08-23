define([
  'jquery',
  'underscore',
  'backbone',
  'text!/templates/mainTemplate.html' 
], function($, _, Backbone, mainTemplate){
  
  var MainView = Backbone.View.extend({
    el: '.container',
    initialize: function () {
    },
    render: function () {
			var that = this;
      $(this.el).html(mainTemplate);
      
      that.controls = $('.nav_controls');
      that.map_controls = $('#map_controls');

      that.map = {};

      that._initialize_map ();
      
      that.show_map ();
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
      this.map = new google.maps.Map(document.getElementById('map'),
                                     mapOptions);
    },

    show_map: function (){
      var self = this;
      var speed = 800;

      //hide content

      //hide controls
      self.controls.hide();

      //resize map canvas. make map 100%
      // self.map.animate({height: '100%'}, speed);

      setTimeout(function(){
        //show map controls
        self.map_controls.css({top: '80%'});
        self.map_controls.fadeIn();
      }, speed);
    }
	});
  return MainView;

});
