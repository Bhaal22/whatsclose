"use strict";


define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){

  
  var view = Backbone.View.extend({
    
    subComponents : [],

    initialize: function(options) {
      
      Backbone.View.prototype.initialize.apply(this);
    }

	});
  return view;

});
