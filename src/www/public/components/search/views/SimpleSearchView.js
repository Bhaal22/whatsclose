"use strict";


define([
  'jquery',
  'underscore',
  'backbone',
  //'/components/criteriaSelection/views/CriteriaView',
  '/components/datepicker/views/DatePickerView.js',
  //'/components/location/views/LocationView',
  'text!/components/search/templates/search.html',
  'css!/components/search/css/expander'
], function($, _, Backbone, /*CriteriaView,*/ DatePickerView /*, LocationView,*/ searchTemplate){

  
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
