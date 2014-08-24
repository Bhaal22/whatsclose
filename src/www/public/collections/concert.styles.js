//---------------------------------------
// Concert.Styles Collection
// ---------------
// Retrieved via the REST API provided by whatclose.

var ConcertStyles = Backbone.Collection.extend({
  // Reference to this collection's model.
  model: Concert.Style,
  url:"api/styles",

  add_new: function(style){
    this.create(style);
  }
});
