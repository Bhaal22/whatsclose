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

      _.bindAll(this, 'render');

      
      
    },

    render: function () {
      
			$(this.el).html(searchTemplate);

      var criteriaView = new CriteriaView ({ 'vent': this.vent, 'location': '#criteria-fields' });
      criteriaView.render ();

      var datePickerView = new DatePickerView({ 'vent': this.vent, 'location': '#datePicker-fields' });
      datePickerView.render ();
		}

	});
  return view;

});
