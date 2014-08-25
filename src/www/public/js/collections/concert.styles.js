//---------------------------------------
// Concert.Styles Collection
// ---------------
// Retrieved via the REST API provided by whatclose.

define([
  'jquery',
  'underscore',
  'backbone',
  'models/concert.style'
], function($, _, Backbone, ConcertStyle){
  var ConcertStyles = Backbone.Collection.extend({
    // Reference to this collection's model.
    model: ConcertStyle,
    url:"/api/styles",
   

    parse: function(response) {
      console.log(response[0]);
    }
  });
  
  return ConcertStyles;
});
