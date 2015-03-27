
define([
  'jquery',
  'datepicker',
  'underscore',
  'backbone',
  'collections/concerts',
  'views/band_selector',
  'text!/templates/searchTemplate.html',
], function($, dp, _, Backbone, Concerts, BandSelectorView, searchTemplate){

  
  var view = Backbone.View.extend({
    
    location: '#location-input',
    band: '#band-input',
    radius: '#radius-input',
    from: '#from-input',
    to: '#to-input',
    vent: '',

    initialize: function (options) {
      this.vent = options.vent;
      this.el = options.location;

      _.bindAll(this, 'render', '_reset', '_search', '_updateLocation', '_validate');

      
      
    },

    render: function () {
			var that = this;
      $(this.el).html(searchTemplate);
      
      $('#search-expander').on('click',function(e){
        e.preventDefault();
        $('#search-expander').toggleClass('expanded');
        $('#expander-handle').toggleClass('glyphicon-chevron-down');
        $('#expander-handle').toggleClass('glyphicon-chevron-up');
        
        $('.search-form').toggleClass('form-expanded');
      });

      $('#band-input').on('', function (e) {
        
      });

      $("#from-input").datepicker({
        format: "yyyy-mm-dd",
        weekStart: 1,
        setDate: new Date(),
        todayBtn: "linked",
        todayHighlight: true,
        autoclose: true
      });

      var today = new Date();
      $('#from-input').datepicker('update', today);

      $("#to-input").datepicker({
        format: "yyyy-mm-dd",
        weekStart: 1,
        todayBtn: "linked",
        todayHighlight: true,
        autoclose: true
      });

      today.setDate(today.getDate() + 21);
      $('#to-input').datepicker('update', today);

      $(that.radius).val("100km");
      $('#search-button').click(this._search);

      this.band_selector = new BandSelectorView({});
		},

    _validate: function(elt) {
      var self = this;
      var pattern = $(self.radius).attr('pattern');

      var content = $(self.radius).val();
      var regex = /(\d+)(km)?/i;
      
      var match = regex.exec(content);
      console.dir(match);
      if ((match) && (match[2] === undefined)) {
        content = content.concat("km");
        $(self.radius).val(content);
      }
    },
    
    
    _search: function (elt) {
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
