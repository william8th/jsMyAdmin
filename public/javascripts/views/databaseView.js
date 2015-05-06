define(['backbone', 'handlebars', 'jquery', 'events'], 
  function(Backbone, Handlebars, $, Events) {
  var DatabaseView = Backbone.View.extend({
    events: {
      'click .dbname': 'databaseView'
    },
    tagName: 'div',
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
      var url = 'database/' + dbname;
      Events.trigger('router:navigate', url);
    }
  });

  return DatabaseView;
});
