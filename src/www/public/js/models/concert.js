define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){

  var Concert = Backbone.Model.extend({
    defaults: {
      bandName: '',
      date: '',
      geometry: {}
    }
  });
  
  return Concert;
});
