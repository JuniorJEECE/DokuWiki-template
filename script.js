/**
 *  We handle several device classes based on browser width.
 *
 *  - desktop:   > __tablet_width__ (as set in style.ini)
 *  - mobile:
 *    - tablet   <= __tablet_width__
 *    - phone    <= __phone_width__
 */
var device_class = ''; // not yet known
var device_classes = 'desktop mobile tablet phone';

function tpl_dokuwiki_mobile() {

    // the z-index in mobile.css is (mis-)used purely for detecting the screen mode here
    var screen_mode = jQuery('#screen__mode').css('z-index') + '';

    // determine our device pattern
    // TODO: consider moving into dokuwiki core
    switch (screen_mode) {
        case '1':
            if (device_class.match(/tablet/)) return;
            device_class = 'mobile tablet';
            break;
        case '2':
            if (device_class.match(/phone/)) return;
            device_class = 'mobile phone';
            break;
        default:
            if (device_class == 'desktop') return;
            device_class = 'desktop';
    }

    jQuery('html').removeClass(device_classes).addClass(device_class);

    // handle some layout changes based on change in device
    var $handle = jQuery('#dokuwiki__aside h3.toggle');
    var $toc = jQuery('#dw__toc h3');

    if (device_class == 'desktop') {
        // reset for desktop mode
        if ($handle.length) {
            $handle[0].setState(1);
            $handle.hide();
        }
        if ($toc.length) {
            $toc[0].setState(1);
        }
    }
    if (device_class.match(/mobile/)) {
        // toc and sidebar hiding
        if ($handle.length) {
            $handle.show();
            $handle[0].setState(-1);
        }
        if ($toc.length) {
            $toc[0].setState(-1);
        }
    }
}

jQuery(function() {
    var resizeTimer;
    dw_page.makeToggle('#dokuwiki__aside h3.toggle', '#dokuwiki__aside div.content');

    tpl_dokuwiki_mobile();
    jQuery(window).bind('resize',
        function() {
            if (resizeTimer) clearTimeout(resizeTimer);
            resizeTimer = setTimeout(tpl_dokuwiki_mobile, 200);
        }
    );

    // increase sidebar length to match content (desktop mode only)
    var $sidebar = jQuery('.desktop #dokuwiki__aside');
    if ($sidebar.length) {
        var $content = jQuery('#dokuwiki__content div.page');
        $content.css('min-height', $sidebar.height());
    }
});

// Call this function on every load and reload.
window.onload = function() {

  // Correct the search bar.
  jQuery(function() {

      jQuery('#dw__search > .no').addClass('input-group');                                              // add lacking class
      jQuery('#qsearch__in').addClass('form-control');                                                  // add lacking class
      jQuery('#qsearch__in').attr('placeholder', jQuery('#dw__search > .no > .button').attr('value'));  // add a placeholder
      jQuery('#dw__search > .no > .button').remove();                                                   // remove useless element
  });

  // Correct the user menu.
  jQuery(function() {

      var user = jQuery('#user > bdi').html() + ' (' + jQuery('#user > bdi').next().html() + ') ' + '<b class="caret"></b>';  // get the user name and identifier
      jQuery('#user').html(user);                                                                                             // update the content by keeping only the informations above
  });

  // Correct the trace.
  jQuery(function() {

      // Flush the new breadcrumb of all existing content.
      jQuery('#new-breadcrumbs').each(function(index) {

          if (jQuery(this).parent().hasClass('trace-element'))
              jQuery(this).remove();
      });

      var n = jQuery('#dokuwiki-breadcrumbs bdi').children().length;

      // Get all elements of the DokuWiki breadcrumb, for each retrive the link and add it to the new breadcrumb
      jQuery('#dokuwiki-breadcrumbs bdi').each(function(index) {

          if (n <= 1 || index != 0)  // don't display the first element when there is multiple element; DokuWiki always display the home page as the root which is not the real tree
              jQuery('#new-breadcrumbs').append('<li class="trace-element">' + jQuery(this).html() + '</li>');
      });

      // Remove the DokuWiki breadcrumb.
      jQuery('#dokuwiki-breadcrumbs').remove();
  });
};
