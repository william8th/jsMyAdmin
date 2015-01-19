define(['backbone', 'collections/table'], function(Backbone, TableCollection) {
  return Backbone.Model.extend({
    initialize: function() {
      this.tableCollection = new TableCollection();
      this.tableCollection.id = this.id;
      this.tableCollection.url = '/database/' + this.id;
      this.tableCollection.fetch({ reset: true });
    },
    idAttribute: 'database',
  });
});
