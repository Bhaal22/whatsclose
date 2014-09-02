//---------------------------------------
// Concert.Styles Collection
// ---------------
// Retrieved via the REST API provided by whatclose.

define([
  'jquery',
  'underscore',
  'backbone',
  'models/concert'
], function($, _, Backbone, Concert){
  var Concerts = Backbone.Collection.extend({
    model: Concert,
    url:"/api/concerts",
   

    parse: function(response) {
    }
  });
  
  return Concerts;
});
