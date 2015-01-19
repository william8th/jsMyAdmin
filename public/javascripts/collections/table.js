define(['backbone', 'models/table'], function(Backbone, Table) {
  return Backbone.Collection.extend({
    model: Table
  });
});
