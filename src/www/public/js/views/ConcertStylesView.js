var ConcertStyleView = Backbone.View.extend({
  tagName: "option",
  
  initialize: function(){
    _.bindAll(this, 'render');
  },
  render: function(){
    $(this.el).attr('value',
                    this.model.get('id')).html(this.model.get('name'));
    return this;
  }
});

var ConcertStylesView = Backbone.View.extend({
  el:  $("#concert.styles"),

  initialize: function(){
    //_.bindAll(this, 'addOne', 'addAll');
    //this.collection.bind('reset', this.addAll);
  },
  addOne: function(country){
    $(this.el).append(
      new ConcertStyleView({ model: ConcertStyle }).render().el);
  },
  addAll: function(){
    this.collection.each(this.addOne);
  }

});
