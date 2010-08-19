// Encapsulate code using module pattern 
// http://yuiblog.com/blog/2007/06/12/module-pattern/
(function($) {
  var app = $.sammy(function() {

    // Select root element to act on
    this.element_selector = '#main';    

    // Verify sammy is running
    this.get('#/', function(context) {
      context.log('Hello World');
    });

  });

  // Run Sammy app
  $(function() {
    app.run('#/');
  });

})(jQuery);
