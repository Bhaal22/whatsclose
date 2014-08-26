define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){

  var ConcertStylesView = Backbone.View.extend({
    el:  '#concertstyles',

    initialize: function(response){
      this.collection = response;
      
      _.bindAll(this, 'addOne', 'addAll');
      //this.collection.bind('reset', this.addAll);
    },

    addOne: function(country){
      $(this.el).append(new Option(country.key, country.key));
    },
    addAll: function(){
      this.collection.forEach(this.addOne);
    },

    render: function() {
      this.addAll();
    }

  });
  
  return ConcertStylesView;
});
