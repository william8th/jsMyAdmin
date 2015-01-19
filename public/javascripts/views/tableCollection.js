define(['backbone', 'views/table'], function(Backbone, TableView) {
  var TableCollectionView = Backbone.View.extend({
    initialize: function() {
      this.listenTo(this.collection, 'reset', this.render);
    },
    tagName: 'ul',
    className: 'tableCollection',
    render: function() {
      this.$el.html('');
      this.collection.each(function(database) {
        var tableView = new TableView({ model: database });
        this.$el.append(tableView.render().el);
      }, this);
      return this;
    }
  });

  return TableCollectionView;
});
