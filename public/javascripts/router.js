define(['backbone', 'events', 'collections/database', 'views/databaseCollection', 'views/tableCollection'], function(Backbone, Events, DatabaseCollection, DatabaseCollectionView, TableCollectionView) {
  var Router = Backbone.Router.extend({
    initialize: function() {
      var self = this;
      this._setupCollection();
      Events.on('router:navigate', function(url) {
        self.navigate(url, {trigger: true});
      });
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

  return Router;
});
