//---------------------------------------
// Concert.Styles Collection
// ---------------
// Retrieved via the REST API provided by whatclose.

define([
  'jquery',
  'underscore',
  'backbone',
  'models/band'
], function($, _, Backbone, Band){
  var Bands = Backbone.Collection.extend({
    model: Band,
    url:"/api/bands",
   

    parse: function(response) {
      //console.log(response[0]);
      return response;
    }
  });
  
  return Bands;
});
