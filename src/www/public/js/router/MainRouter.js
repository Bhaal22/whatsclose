
define([
  'jquery',
  'underscore',
  'backbone',
  'views/IndexView',
], function ($, _, Backbone, IndexView) {
  
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
      
      console.log("default route");
    },

    showAbout: function () {
      console.log("display about");
    }
  });

  return new MainRouter();
});

// define([
//   'jquery',
//   'underscore',
//   'backbone',
//   'views/IndexView',
// ], function ($, _, Backbone, IndexView) {
  
//   var MainRouter = Backbone.Router.extend({
//     routes: {
//       '*actions': 'defaultAction',
//       'messages': 'showMessageAboutMongo', // All urls will trigger this route
//       'about': 'showAbout' 
//     },
    
//   });

//   var init = function(){
//     var router = new MainRouter();

//     console.log("MainRouter / initialize");

// 		router.on('route:defaultAction', function (actions) {

//         var indexView = new IndexView();
//         indexView.render();

//         console.log("default route");
        
// 		});

//     router.on('route:showMessageAboutMongo', function () {

//       console.log("display helpful message about setting up mongo");
//     });

//     router.on('route:showAbout', function () {

//       console.log("display about");
        
//     });

//     Backbone.history.start({ pushState: true });
    
//   };
//   return {
//     initialize: init
//   };
// });
