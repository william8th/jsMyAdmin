define(['backbone', 'models/database'], function(Backbone, Database) { 
  return Backbone.Collection.extend({
    model: Database,
    url: '/database'
  });
});
