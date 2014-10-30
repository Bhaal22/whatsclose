
define([
  'jquery',
  'datepicker',
  'underscore',
  'backbone',
  'collections/concerts',
  'text!/templates/searchTemplate.html',
], function($, dp, _, Backbone, Concerts, searchTemplate){
  
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


      $("#from-input").datepicker({
        format: "yyyy-mm-dd",
        weekStart: 1,
        todayBtn: "linked",
        todayHighlight: true,
        autoclose: true
      });
      $("#to-input").datepicker({
        format: "yyyy-mm-dd",
        weekStart: 1,
        todayBtn: "linked",
        todayHighlight: true,
        autoclose: true
      });

      $('#search-button').click(this._search);
		},

    _search: function (elt) {
      var self = this;
      var concerts = new Concerts ();

      this._reset(elt).done(function() {
     
        self._updateLocation(elt).done(function(_location) {
          var location = _location.lat() + "," + _location.lng();
          console.log('---------------');
          console.log(location);
          console.log('--------------');
          
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
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({'address': address}, function (results, status){
        if (status === google.maps.GeocoderStatus.OK){
          self.vent.trigger('updateLocation', results[0].geometry.location);


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
