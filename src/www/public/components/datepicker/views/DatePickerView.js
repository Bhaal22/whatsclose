"use strict";

define([
  'jquery',
  'underscore',
  'backbone',
  'text!/components/datepicker/templates/template.html',
], function($, _, Backbone) {
  var view = Backbone.View.extend({

    initialize: function(options) {
      _.bindAll(this, 'render');
    }
    
  });

  return view;
}
