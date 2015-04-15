"use strict";


define([
  'jquery',
  'underscore',
  'backbone',
  'text!/components/criteriaSelection/templates/criteriaSelection.html',
], function($, _, Backbone, criteriaTemplate){

  
  var view = Backbone.View.extend({
    
    options:{
      
      /**
       * Object managing global bubbling events
       */
      vent: null,

      /**
       * Array of tags active on component
       * @type {Array}
       */
      tags:[],
      
      /**
       * Flag activating geoloc criteria --INACTIVE--
       * @type {Boolean}
       */
      enableGeolocCriteria: false,

      /**
       * Flag activating date criteria --INACTIVE--
       * @type {Boolean}
       */
      enableDateCriteria: false,

      /**
       * DOM container where the tags are set
       * @type {DIV}
       */
      tagsComponent: null,

      /**
       * DOM INPUT field where the user type the criteria terms
       * @type {INPUT-TEXT}
       */
      inputComponent: null
    },

    initialize: function (options) {
      this.options = options;
      this.el = options.location;

      _.bindAll(this, 'render', '_searchTerm', '_addTag', '_removeTag', '_resizeInputField');
      //this.vent.bind('resetMap', this._onReset);
      
    },

    render: function () {
      // Internal rendering
      $(this.el).html(criteriaTemplate);
      this.tagsComponent = $('#freds-tags');
      this.inputComponent = $('#freds-input');

      // events binding
      this.inputComponent.keyup(this._searchTerm);

		},

    /**
     * Analyse function of the entered input text
     * @return {[type]} [description]
     */
    _searchTerm: function (){
      var debug = true;
    },

    _addTag: function (){
      var debug = true;
    },

    _removeTag: function (){
      var debug = true;
    },

    /**
     * Function resizing the input field according to the number of tags already set
     * @return {[type]} [description]
     */
    _resizeInputField: function (){
      var debug = true;
    }

	});
  return view;

});
