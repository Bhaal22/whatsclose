
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

    initialize: function (options) {
      this.vent = options.vent;
      this.el = options.location;

      _.bindAll(this, 'render');

      
      
    },

    render: function () {
      
			var that = this;
      $(this.el).html(searchTemplate);
		}

	});
  return view;

});
