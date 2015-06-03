"use strict";


define([
  'jquery',
  'underscore',
  'backbone',
  '/components/core/WhatsCloseView.js',
  'text!/components/criteriaSelection/templates/criteriaSelection.html',
  'css!/components/criteriaSelection/css/criteriaSelection.css'
], function($, _, Backbone, WCView, criteriaTemplate){

  
  var view = WCView.extend({
    
    
    /**
     * Array of tags active on component
     * @type {Array}
     */
    tags:[],

    options:{
      
      /**
       * Object managing global bubbling events
       */
      //vent: null,
      
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
      
      _.bindAll(this, 'render', '_searchTerm', '_addTag', '_createTagContainer', '_removeTagHandler', '_resizeInputField', '_createGuid');
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

        this._addTag(inputValue);

        this.subComponents[this.cid + '-input'].val('');
      }
      else{
        console.debug ('Nothing to do...');
      }
    },

    /**
     * Function adding a tag
     * @param {[type]} inputValue [description]
     */
    _addTag: function (inputValue){
      var tagsContainer = this.subComponents[this.cid + '-tags'];
      var uuid = this._createGuid();

      tagsContainer.append(this._createTagContainer(inputValue, uuid));

      this.tags[uuid] = inputValue;
    },

    /**
     * Function generating the container for a corresponding tag and the events associated
     * @param  {[type]} inputValue [description]
     * @return {[type]}            [description]
     */
    _createTagContainer: function (inputValue, uuid){
      var container = $('<div>', {id:this.cid + '-tag-container-' + uuid, class: 'tag-container badge'});
      
      container.html(inputValue);

      var actionContainer = $('<span>', {id:this.cid + '-tag-action-' + uuid, class: 'tag-action glyphicon glyphicon-remove-circle'});
      actionContainer.click({uuid: uuid}, this._removeTagHandler);

      container.append(actionContainer);

      return container;
    },

    _removeTagHandler: function (event){
      console.debug ('_removeTag : ' + event.data.uuid);
    },

    /**
     * Function resizing the input field according to the number of tags already set
     * @return {[type]} [description]
     */
    _resizeInputField: function (){
      console.debug ('_resizeInputField');
    },

    _createGuid: function (){
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }

	});
  return view;

});
