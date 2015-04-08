// Require.js allows us to configure shortcut alias
// Their usage will become more apparent futher along in the tutorial.
require.config({
  paths: {
    // Major libraries
    jquery: 'libs/jquery/jquery-min',
    underscore: 'libs/underscore/underscore-min', // https://github.com/amdjs
    backbone: 'libs/backbone/backbone-min', // https://github.com/amdjs
    //typeahead: 'libs/typeahed/typeahead.bundle.min.js, //https://github.com/twitter/typeahead.js
    
    // Require.js plugins
    text: 'libs/require/text',
    css: 'libs/require-css/css.min',

    // Just a short cut so we can put our html outside the js dir
    // When you have HTML/CSS designers this aids in keeping them out of the js directory
    templates: '../templates'
  }
  /*,
  map: {
    '*': {
      'css': 'libs/require-css/css.min'
    }
  }*/
});

// Let's kick off the application

require([
  'router/MainRouter'
], function(MainRouter){
  
  MainRouter.initialize();

  Backbone.history.start();

});
