"use strict";

define([
  'jquery',
  'underscore',
  'backbone',
  'text!/components/datepicker/templates/template.html',
  '/components/datepicker/js/bootstrap-datepicker.min.js',
  'css!/components/datepicker/css/datepicker3.css'
], function($, _, Backbone, template) {
  var view = Backbone.View.extend({

    initialize: function(options) {

      this.vent = options.vent;
      this.el = options.location;
      
      _.bindAll(this, 'render');
    },

    render: function() {
      $(this.el).html(template);

      var today = new Date();
      $('.input-daterange').datepicker({
        format: "yyyy-mm-dd",
        todayHighlight: true,
        multidate: false,
        toggleActive: true
      });

      $('#from-input').datepicker('update', today);

      today.setDate(today.getDate() + 21);
      $('#to-input').datepicker('update', today);
    }
    
  });

  return view;
});
