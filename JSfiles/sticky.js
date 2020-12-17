;(function($, window, document, undefined) {
  $.fn.stickyNav = function(options) {
    
      // add options for classes
      options = $.extend({
          wrapperClass: 'sticky-nav-wrapper',
          placeholderClass: 'sticky-nav-placeholder',
          elementClass: 'sticky-nav-element',
          zIndexValue: 10
      }, options);

      this.addClass(options.elementClass);

      // create wrapper div
      if (!$('.' + options.wrapperClass).length) {
          this.wrap('<div class="' + options.wrapperClass + '" style="position: relative; top: 0; left: 0; z-index: ' + options.zIndexValue + ';"></div>');
      }

      // create placeholder div
      if (!$('.' + options.placeholderClass).length) {
          this.before('<div class="' + options.placeholderClass + '"></div>');
      }

      var glue = this,
          topPos = this.offset().top;
          
      // sticky function to change position from absolute to fixed, once top of element is even with top of window
      function sticky() {
          glue.prev('div').css('height', glue.height());
          windowTop = $(window).scrollTop();
          return glue.css({
              position: windowTop > topPos ? "fixed" : "absolute",
              'top': 0,
              'left': 0
          });
      }

      $(window).on("load resize scroll", function(e) {
          sticky();
      });

      return this;
  };
}(jQuery, window, document, this));