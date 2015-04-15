"use strict";


define([
  'jquery',
  'underscore',
  'backbone',
  '/components/core/WhatsCloseView.js',
  'text!/components/criteriaSelection/templates/criteriaSelection.html',
], function($, _, Backbone, WCView, criteriaTemplate){

  
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

    },

    initialize: function (options) {
      this.options = options;
      this.el = options.location;
      
      _.bindAll(this, 'render', '_searchTerm', '_addTag', '_removeTag', '_resizeInputField');
      //this.vent.bind('resetMap', this._onReset);
      
    },

    render: function () {
      // Internal rendering
      var renderedTemplate = _.template(criteriaTemplate, {htmlID: this.cid});
      $(this.el).html(renderedTemplate);

      // Internal components reference
      this.subComponents[this.cid + '-tags'] = $('#' + this.cid + '-tags');
      this.subComponents[this.cid + '-input'] = $('#' + this.cid + '-input');

      // Events binding
      this.subComponents[this.cid + '-input'].keypress(this._searchTerm);

		},

    /**
     * Analyse function of the entered input text
     * @return {[type]} [description]
     */
    _searchTerm: function (event){
      // Check if one of the following keys have been pressed : ';', 'ENTER', 'TAB'
      if (event.key && (event.key === 'Enter' || event.key === 'Tab' || event.key === ' ' || event.key === ';')){
        var inputValue = this.subComponents[this.cid + '-input'].val();
        console.debug ('Extract tag : ' + inputValue);
      }
      else{
        console.debug ('Nothing to do...');
      }
    },

    _addTag: function (){
      console.debug ('_addTag');
    },

    _removeTag: function (){
      console.debug ('_removeTag');
    },

    /**
     * Function resizing the input field according to the number of tags already set
     * @return {[type]} [description]
     */
    _resizeInputField: function (){
      console.debug ('_resizeInputField');
    }

	});
  return view;

});
