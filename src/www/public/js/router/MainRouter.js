define([
  'jquery',
  'underscore',
  'backbone',
  'views/IndexView',
  'views/LocationView',
  '/components/search/views/SimpleSearchView.js',
  'views/AboutView'
], function ($, _, Backbone, IndexView, LocationView, SearchView, AboutView) {
  
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

      var searchView = new SearchView ({ 'vent': vent, 'location': '#menu' });
      searchView.render ();

      var aboutView = new AboutView({});
      aboutView.render();
    },

    showAbout: function () {
    }
  });

  return new MainRouter();
});
