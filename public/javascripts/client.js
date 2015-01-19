var Table = Backbone.Model.extend({
  idAttribute: 'table'
});

var TableCollection = Backbone.Collection.extend({
  model: Table
});

var Database = Backbone.Model.extend({
  initialize: function() {
    this.tableCollection = new TableCollection();
    this.tableCollection.id = this.id;
    this.tableCollection.url = '/database/' + this.id;
    this.tableCollection.fetch({ reset: true });
  },
  idAttribute: 'database',
});

var DatabaseCollection = Backbone.Collection.extend({
  model: Database,
  url: '/database'
});

var DatabaseView = Backbone.View.extend({
  events: {
    'click .dbname': 'databaseView'
  },
  tagName: 'li',
  className: 'database',
  render: function() {
    var template = $('#databaseCollectionView').html();
    var compiled = Handlebars.compile(template);
    var html = compiled(this.model.attributes);
    this.$el.html(html);
    return this;
  },
  databaseView: function(e) {
    e.preventDefault();
    var dbname = this.model.get('database');
    router.navigate('database/' + dbname, {trigger: true});
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

var TableView = Backbone.View.extend({
  tagName: 'li',
  className: 'table',
  render: function() {
    var template = $('#tableCollectionView').html();
    var compiled = Handlebars.compile(template);
    var html = compiled(this.model.attributes);
    this.$el.html(html);
    return this;
  }
});

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

var AppRouter = Backbone.Router.extend({
  initialize: function() {
    this._setupCollection();
  },
  routes: {
    '': 'index',
    'database/:dbname': 'singleDatabase'
  },
  _setupCollection: function() {
    if (this.collection) return;
    var data = $('#initialData').html();
    this.collection = new DatabaseCollection(JSON.parse(data));
  },
  _renderView: function(view){             
    $('.app').html(view.render().el);
  },
  index: function() {
    var view = new DatabaseCollectionView({ collection: this.collection });
    this._renderView(view);
  },
  singleDatabase: function(dbname) { 
    var database = this.collection.get(dbname);
    var view = new TableCollectionView({ collection: database.tableCollection });
    this._renderView(view);
  }
});
