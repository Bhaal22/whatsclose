define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){

  var Venue = Backbone.Model.extend({
    defaults: {
      name: '',
      website: '',
      urlRoot:"/api/venues",
    }
  });
  
  return Venue;
});
