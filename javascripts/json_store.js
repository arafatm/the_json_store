// Encapsulate code using module pattern 
// http://yuiblog.com/blog/2007/06/12/module-pattern/
(function($) {
  var app = $.sammy(function() {

    // Select root element to act on
    this.element_selector = '#main';    

    this.use(Sammy.Template);

    // Verify load of json data and log to console
    this.get('#/', function(context) {
      context.app.swap('');
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
          console.log('context.params[id] = ' + context.params['id']);
          var item_id = -1;
          for (var i = 0; i < context.items.length; i++) {
            console.log('context.items[i].id = ' + context.items[i].id);
            if (context.items[i].id == context.params['id'])  { 
              item_id = i;
              break;
            }
          }
          console.log('item_id = ' + item_id);
          if (item_id == -1) { return context.notFound(); }
          context.item = context.items[item_id];
          context.partial('templates/item_detail.template');
        }
      });
    });

    var cart = {};
    this.post('#/cart', function(context) {
      context.log('params = ' + this.params);
      var item_id = this.params['item_id'];
      if (!cart[item_id]) {
        // this item is not yet in our cart initialize its quantity with 0
        cart[item_id] = 0;
      }
      cart[item_id] += parseInt(this.params['quantity']);
      this.log("The current cart: ", cart);
    });

  });

  // Run Sammy app
  $(function() {
    app.run('#/');
  });

})(jQuery);
