define(['backbone', 'handlebars', 'jquery', 'events'], 
  function(Backbone, Handlebars, $, Events) { 
  var SchemaView = Backbone.View.extend({
    events: {
      'click .schemeName': 'schemeView'
    },
    render: function() {
      var template = $('#tableCollectionView').html();
      var compiled = Handlebars.compile(template);
      var html = compiled(this.model.attributes);
      this.$el.html(html);
      return this;
    },
    schemeView: function(e) {
      e.preventDefault();
      var url = 'database/' + this.model.get('database') + '/' + this.model.get('scheme');
      Events.trigger('router:navigate', url);
    }
  });

  return SchemaView;
});
