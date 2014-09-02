//var styles = new ConcertStyles();


define([
  'jquery',
  'underscore',
  'backbone',
  'views/IndexView',
  'views/LocationView',
  'views/SearchView',
], function ($, _, Backbone, IndexView, LocationView, SearchView) {
  
  var MainRouter = Backbone.Router.extend({
    routes: {
      '': 'defaultAction',
      'about': 'showAbout' 
    },
    initialize: function () {
      

    },

    defaultAction: function (){
      var vent = _.extend({}, Backbone.Events);

      var indexView = new IndexView({'vent':vent});
      indexView.render();

      //var locationView = new LocationView({'vent': vent, 'location': '#menu'});
      //locationView.render();

      var searchView = new SearchView ({ 'vent': vent, 'location': '#menu' });
      searchView.render ();

      console.log("default route");
    },

    showAbout: function () {
      console.log("display about");
    }
  });

  return new MainRouter();
});
