define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){

  var Band = Backbone.Model.extend({
    defaults: {
      name: '',
      website: '',
      count: ''
      
    }
  });
  
  return Band;
});
