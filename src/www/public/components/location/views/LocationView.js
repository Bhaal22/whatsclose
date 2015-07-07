"use strict";


define([
  'jquery',
  'underscore',
  'backbone',
  '/components/core/WhatsCloseView.js',
  'text!/components/location/templates/template.html',
  'css!/components/location/css/location.css'
], function($, _, Backbone, WCView, LocationTemplate){

  
  var view = WCView.extend({
    
    options:{
      
      /**
       * Object managing global bubbling events
       */
      vent: null,

      /**
       * Array of tags active on component
       * @type {Array}
       */
      tags:[]
    },

    initialize: function (options) {
      this.options = options;
      this.el = options.location;
      
      _.bindAll(this, 'render');
    },

    render: function () {
      // Internal rendering
      var renderedTemplate = _.template(LocationTemplate, {htmlID: this.cid});
      $(this.el).html(renderedTemplate);

      $(".dropdown-menu li a").click(function(){
        var selText = $(this).text();
        $(this).parents('.input-group-btn').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');
      });

$("#btnSearch").click(function(){
	alert($('.btn-select').text()+", "+$('.btn-select2').text());
});

      // Internal components reference
      // this.subComponents[this.cid + '-tags'] = $('#' + this.cid + '-tags');
      // this.subComponents[this.cid + '-input'] = $('#' + this.cid + '-input');
		}
	});
  return view;

});
