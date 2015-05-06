define(['backbone', 'views/schemaView'], 
  function(Backbone, SchemaView) {
  var SchemaCollectionView = Backbone.View.extend({
    initialize: function() {
      this.listenTo(this.collection, 'reset', this.render);
    },
    tagName: 'div',
    className: 'tableCollection',
    render: function() {
      this.$el.html('');
      this.collection.each(function(database) {
        var schemaView = new SchemaView({ model: database });
        this.$el.append(schemaView.render().el);
      }, this);
      return this;
    }
  });

  return SchemaCollectionView;
});
