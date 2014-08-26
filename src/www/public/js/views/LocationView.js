
define([
  'jquery',
  'underscore',
  'backbone',
  'text!/templates/locationTemplate.html',
], function($, _, Backbone, locationTemplate){
  
  var LocationView = Backbone.View.extend({
    
    location: '#location-input',
    vent: '',

    initialize: function (options) {
      this.vent = options.vent;
      this.el = options.location;

      _.bindAll(this, 'render', '_updateLocation');
      // fires "updateLocation"
    },

    render: function () {
			var that = this;
      $(this.el).html(locationTemplate);

      $('#update-button').click(this._updateLocation);
		},
    
    _updateLocation : function(elt) {
      var self = this;
      var address = $(this.location).val();
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({'address': address}, function (results, status){
        if (status === google.maps.GeocoderStatus.OK){
          self.vent.trigger('updateLocation', results[0].geometry.location);
        }
      });

    }

	});
  return LocationView;

});
