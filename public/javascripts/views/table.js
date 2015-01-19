define(['backbone', 'handlebars', 'jquery'], function(Backbone, Handlebars, $) { 
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

  return TableView;
});
