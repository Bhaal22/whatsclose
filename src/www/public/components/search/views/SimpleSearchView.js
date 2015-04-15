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

    /**
     * DOM component unique ID
     * @type {Integer}
     */
    htmlID: null,

    initialize: function (options) {
      this.vent = options.vent;
      this.el = options.location;
      this.htmlID = _.uniqueId();

      _.bindAll(this, 'render');

      
      
    },

    render: function () {
      // Internal rendering
      var renderedTemplate = _.template(searchTemplate, {htmlID: this.htmlID});
      $(this.el).html(renderedTemplate);

      // Sub-components instanciation & rendering
      var criteriaView = new CriteriaView ({ 'vent': this.vent, 'location': '#' + this.htmlID + '-criteria-fields' });
      criteriaView.render ();

      var datePickerView = new DatePickerView({ 'vent': this.vent, 'location': '#datePicker-fields' });
      datePickerView.render ();
		}

	});
  return view;

});
