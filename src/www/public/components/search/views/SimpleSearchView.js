"use strict";


define([
  'jquery',
  'underscore',
  'backbone',
  '/components/criteriaSelection/views/CriteriaView.js',
  '/components/datepicker/views/DatePickerView.js',
  //'/components/location/views/LocationView',
  'text!/components/search/templates/search.html',
  'css!/components/search/css/expander.css'
], function($, _, Backbone, CriteriaView, DatePickerView, /*LocationView,*/ searchTemplate){

  
  var view = Backbone.View.extend({

    initialize: function (options) {
      this.vent = options.vent;
      this.el = options.location;

      _.bindAll(this, 'render', '_reset', '_search', '_updateLocation', '_validate');
    },

    render: function () {
      // Internal rendering
      var renderedTemplate = _.template(searchTemplate, {htmlID: this.cid});
      $(this.el).html(renderedTemplate);

      // Sub-components instanciation & rendering
      var criteriaView = new CriteriaView ({ 'vent': this.vent, 'location': '#' + this.cid + '-criteria-fields' });
      criteriaView.render ();

      var datePickerView = new DatePickerView({ 'vent': this.vent, 'location': '#datePicker-fields' });
      datePickerView.render ();
		},

    _validate: function(elt) {
      //iterate through components to get all models to give to validate their content
      
      
    },

    _search: function() {
      //iterate through components to get all models to give to search REST API

      var self = this;

      self._validate(elt);
         
      var concerts = new Concerts ();

      this._reset(elt).done(function() {
     
        self._updateLocation(elt).done(function(_location) {
          var location = _location.lat() + "," + _location.lng();
          
          concerts.fetch ({ 
            data: { 
              bandNames: $(self.band).val(),
              location: location,
              from: $(self.from).val(),
              to: $(self.to).val(),
              radius: $(self.radius).val()
            },
            success: function (collection, response) {
              console.dir(response);
              console.dir(collection);
              
              self.vent.trigger('concertsRetrieved', {
                query: {
                  from: $(self.from).val()
                },
                concerts: response
              });
            }
          })
        })
      });

      
    },

    _reset: function(elt) {

      console.log('SearchView resetting ....');
      var self = this;
      var deferred = $.Deferred();
      
      self.vent.trigger('resetMap');
      
      deferred.resolve();
      return deferred;
    },

    _updateLocation : function(elt) {

      var deferred = $.Deferred();

      var self = this;
      //var address = $(this.location).val();
      //var radius = $(this.radius).val();

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
