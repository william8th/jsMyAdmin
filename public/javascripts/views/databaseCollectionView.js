define(['backbone', 'views/databaseView'], 
  function(Backbone, DatabaseView) {
  var DatabaseCollectionView = Backbone.View.extend({
    initialize: function() {
      this.listenTo(this.collection, 'reset', this.render);
    },
    tagName: 'div',
    className: 'databaseCollection',
    render: function() {
      this.$el.html('');
      this.collection.each(function(database) {
        var databaseView = new DatabaseView({ model: database });
        this.$el.append(databaseView.render().el);
      }, this);
      return this;
    }
  });

  return DatabaseCollectionView;
});
