"use strict";


define([
  'jquery',
  'underscore',
  'backbone',
  '/components/criteriaSelection/views/CriteriaView.js',
  //'/components/datepicker/views/DatePickerView',
  //'/components/location/views/LocationView',
  'text!/components/search/templates/search.html',
  'css!/components/search/css/expander'
], function($, _, Backbone, CriteriaView, /*DatePickerView, LocationView,*/ searchTemplate){

  
  var view = Backbone.View.extend({

    initialize: function (options) {
      this.vent = options.vent;
      this.el = options.location;
    
      _.bindAll(this, 'render');

      
      
    },

    render: function () {
      // Internal rendering
      var renderedTemplate = _.template(searchTemplate, {htmlID: this.cid});
      $(this.el).html(renderedTemplate);

      // Sub-components instanciation & rendering
      var criteriaView = new CriteriaView ({ 'vent': this.vent, 'location': '#' + this.cid + '-criteria-fields' });
      criteriaView.render ();
		}

	});
  return view;

});
