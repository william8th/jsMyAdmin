var Table = Backbone.Model.extend({
  idAttribute: 'table'
});

var Database = Backbone.Model.extend({
  idAttribute: 'database'
});

var DatabaseCollection = Backbone.Collection.extend({
  model: Database,
  url: '/database'
});

var DatabaseView = Backbone.View.extend({
  tagName: 'li',
  className: 'database',
  render: function() {
    var template = $('#databasetemplate').html();
    var compiled = Handlebars.compile(template);
    var html = compiled(this.model.attributes);
    this.$el.html(html);
    return this;
  }
});

var DatabaseCollectionView = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, 'reset', this.render);
  },
  tagName: 'ul',
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

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index'
  },
  index: function() {
    var dbCollection = new DatabaseCollection();
    dbCollection.fetch({ reset: true });
    var view = new DatabaseCollectionView({ collection: dbCollection });
    $('.app').html(view.render().el);    
  }
});
