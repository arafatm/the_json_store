// Encapsulate code using module pattern 
// http://yuiblog.com/blog/2007/06/12/module-pattern/
(function($) {
  var app = $.sammy(function() {

    // Select root element to act on
    this.element_selector = '#main';    

    this.use(Sammy.Template);

    // Verify load of json data and log to console
    this.get('#/', function(context) {
      $.ajax({
        url: 'data/items.js', 
        dataType: 'json',
        success: function(items) {
          $.each(items, function(i, item) {
            context.log(i, item.title, '-', item.artist);
            context.partial('templates/item.template', {item: item}, 
                            function(rendered) {
              context.$element().append(rendered);
            });
          });
        }
      });
    });

    this.get('#/item/:id', function(context) {
      console.log("details for item " + context.params['id']);
      $.ajax({
        url: 'data/items.js', 
        dataType: 'json',
        success: function(items) {
          context.items = items;
          console.log("returned " + items.length + " items");
          context.item = context.items[context.params['id']];
          if (!context.item) { return context.notFound(); }
          context.partial('templates/item_detail.template');
        }
      });
    });


  });

  // Run Sammy app
  $(function() {
    app.run('#/');
  });

})(jQuery);
