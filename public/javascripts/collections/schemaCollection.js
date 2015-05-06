define(['backbone', 'models/scheme'], 
  function(Backbone, Scheme) {
  return Backbone.Collection.extend({
    model: Scheme,
    url: this.id + '/'
  });
});
