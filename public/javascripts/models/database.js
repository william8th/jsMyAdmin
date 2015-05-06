define(['backbone', 'underscore', 'collections/schemaCollection'], 
  function(Backbone, _, SchemaCollection) {
  return Backbone.Model.extend({
    initialize: function() {
      this.schemaCollection = new SchemaCollection();
      this.schemaCollection.id = this.id;
      this.schemaCollection.url = '/database/' + this.id;
      this.schemaCollection.fetch({ reset:true });

    },
    idAttribute: 'database',
  });
});
