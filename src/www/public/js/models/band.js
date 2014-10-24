define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){

  var Band = Backbone.Model.extend({
    defaults: {
      bandName: ''
    }
  });
  
  return Band;
});
