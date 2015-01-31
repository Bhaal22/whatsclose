//---------------------------------------
// Concert Marker View
// --------------
// The DOM element for a concert marker...
//---------------------------------------
define([
  'jquery',
  'underscore',
  'backbone',
  'collections/bands'
], function($, _, Backbone, Bands){
  var BandSelectorView = Backbone.View.extend({

    location: '#bands',

    initialize: function(options) {
      var self = this;

      _.bindAll(this, '_auto_complete', 'render');

      this.bands = new Bands();
      this.bands.fetch().done(function(){
        self.render();
      });

      //$('#band-input').keypress(this._auto_complete);

      
      
    },
    
    render: function() {
      console.log('rendering');
     
      this.bands.models.forEach(function(band) {

        var value = band.get('name');
        var string = band.get('name') + ' (' + band.get('count') + ')';

        $('#bands').append("<option value='" + value + "'>" + string + "</option>");
      });
    },
    
    _auto_complete: function (elt) {
     
    }
  });

  return BandSelectorView;
});
