
define([
  'jquery',
  'underscore',
  'backbone',
  'collections/concerts',
  'text!/templates/searchTemplate.html',
], function($, _, Backbone, Concerts, searchTemplate){
  
  var view = Backbone.View.extend({
    
    location: '#location-input',
    band: '#band-input',
    radius: '#radius-input',
    vent: '',

    initialize: function (options) {
      this.vent = options.vent;
      this.el = options.location;

      _.bindAll(this, 'render', '_search');
    },

    render: function () {
			var that = this;
      $(this.el).html(searchTemplate);

      $('#search-button').click(this._search);
		},

    _search: function (elt) {
      var self = this;
      var concerts = new Concerts ();

      concerts.fetch ({ 
        data: { 
          bandName: $(this.band).val(),
          location: $(this.location).val(),
          radius: $(this.radius).val()
        },
        success: function (collection, response) {
          console.log('coucou');
          console.dir(response);
          console.dir(collection);

          self.vent.trigger('concertsRetrieved', response);
        }
      });
    }

	});
  return view;

});
