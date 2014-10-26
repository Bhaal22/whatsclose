
define([
  'jquery',
  'underscore',
  'backbone',
  'collections/concerts',
  'collections/bands', 
  'text!/templates/searchTemplate.html',
], function($, _, Backbone, Concerts, Bands, searchTemplate){
  
  var view = Backbone.View.extend({
    
    location: '#location-input',
    band: '#band-input',
    radius: '#radius-input',
    vent: '',

    initialize: function (options) {
      this.vent = options.vent;
      this.el = options.location;

      _.bindAll(this, 'render', '_reset', '_search', '_updateLocation');
    },

    render: function () {
			var that = this;
      $(this.el).html(searchTemplate);

      $('#search-button').click(this._search);

      var bands = new Bands();
		},

    _search: function (elt) {
      var self = this;
      var concerts = new Concerts ();

      this._reset(elt).done(function() {
     
        self._updateLocation(elt).done(function(_location) {
          var location = _location.lat() + "," + _location.lng();
          
          concerts.fetch ({ 
            data: { 
              bandName: $(self.band).val(),
              location: location,
              radius: $(self.radius).val()
            },
            success: function (collection, response) {
              console.dir(response);
              console.dir(collection);
              
              self.vent.trigger('concertsRetrieved', response);
            }
          })
        })
      });
    },

    _reset: function(elt) {
      var self = this;
      var deferred = $.Deferred();
      
      self.vent.trigger('resetMap');
      
      deferred.resolve();
      return deferred;
    },

    _updateLocation : function(elt) {

      var deferred = $.Deferred();


      var self = this;
      var address = $(this.location).val();
      var radius = $(this.radius).val();

      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({'address': address}, function (results, status){
        if (status === google.maps.GeocoderStatus.OK){
          self.vent.trigger('updateLocation', {
            location: results[0].geometry.location,
            radius: radius
          });


          console.log(results[0].geometry.location);
          deferred.resolve (results[0].geometry.location);
        }
        else
          deferred.reject();
      });

      return deferred.promise();
    }

	});
  return view;

});
