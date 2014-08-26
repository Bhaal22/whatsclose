//var styles = new ConcertStyles();


define([
  'jquery',
  'underscore',
  'backbone',
  'views/IndexView',
  'views/ConcertStylesView',
  'collections/concert.styles'
], function ($, _, Backbone, IndexView, ConcertStylesView, ConcertStyles) {
  
  var MainRouter = Backbone.Router.extend({
    routes: {
      '': 'defaultAction',
      'about': 'showAbout' 
    },
    initialize: function () {
    },

    defaultAction: function (){
      var indexView = new IndexView();
      indexView.render();

      var styles = new ConcertStyles();
      styles.fetch ({
        "success": function (collection, response) {
          //console.dir(collection);
          //console.dir(response);

          var concertStylesView = new ConcertStylesView(response);
          concertStylesView.render();
        }
        });

      // setTimeout(function(){
      //   styles.fetch();
      //   //create views
      //    var list_view = new ConcertStylesView();
      // }, 2000);
      console.log("default route");
    },

    showAbout: function () {
      console.log("display about");
    }
  });

  return new MainRouter();
});
