//var styles = new ConcertStyles();


define([
  'jquery',
  'underscore',
  'backbone',
  'views/IndexView',
  'views/LocationView'
], function ($, _, Backbone, IndexView, LocationView) {
  
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

      var locationView = new LocationView({'vent': vent, 'location': '#menu'});
      locationView.render();

      // var styles = new ConcertStyles();
      // styles.fetch ({
      //   "success": function (collection, response) {
      //     //console.dir(collection);
      //     //console.dir(response);

      //     var concertStylesView = new ConcertStylesView(response);
      //     concertStylesView.render();
      //   }
      //   });

      console.log("default route");
    },

    showAbout: function () {
      console.log("display about");
    }
  });

  return new MainRouter();
});
