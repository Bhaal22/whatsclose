define([
  'jquery',
  'underscore',
  'backbone',
  'text!/templates/aboutTemplate.html'
], function($, _, Backbone, aboutTemplate){

  
  var view = Backbone.View.extend({
    el: '#head',

    vent: '',

    initialize: function (options) {
      //this.vent = options.vent;

      _.bindAll(this, 'render');
    },

    render: function () {
			var that = this;
      $(this.el).html(aboutTemplate);
		}

	});
  return view;

});
