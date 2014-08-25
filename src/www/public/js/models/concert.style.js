define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){

  var ConcertStyle = Backbone.Model.extend({
    defaults: {
      key: '',
      doc_count: 0
    }
  });
  
  console.log ('returning Style ...');
  return ConcertStyle;
});
