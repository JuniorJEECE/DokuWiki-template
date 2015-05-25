/*
 * This file is part of the JEECE Dokuwiki template package.
 *
 * (c) Théo FIDRY <theo.fidry@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

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

  'use strict';

  // the z-index in mobile.css is (mis-)used purely for detecting the screen mode here
  var screen_mode = $('#screen__mode').css('z-index') + '';

  // determine our device pattern
  // TODO: consider moving into dokuwiki core
  switch (screen_mode) {
    case '1':
      if (device_class.match(/tablet/))
        return;
      device_class = 'mobile tablet';
      break;
    case '2':
      if (device_class.match(/phone/))
        return;
      device_class = 'mobile phone';
      break;
    default:
      if (device_class === 'desktop')
        return;
      device_class = 'desktop';
  }

  $('html').removeClass(device_classes).addClass(device_class);

  // handle some layout changes based on change in device
  var $handle = $('#dokuwiki__aside').find('h3.toggle');
  var $toc = $('#dw__toc').find('h3');

  if (device_class === 'desktop') {
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


//
// Custom Javascript
///////////////////////

// Call this function on every load and reload.
window.onload = function() {

  'use strict';

  jQuery(function() {

    // Correct the search bar.
    var $qsearch = $('#dw__search');
    var $qsearch_in = $('#qsearch__in');
    $qsearch.find('> .no').addClass('input-group'); // add lacking class

    $qsearch_in.addClass('form-control'); // add lacking class
    $qsearch_in.attr('placeholder', $qsearch.find('> .no > .button').attr('value')); // add a placeholder
    $qsearch.find('> .no > .button').remove(); // remove useless element


    // Correct the user menu.
    var $user = $('#user');
    var user = $user.find('> bdi').html() + ' (' + $user.find('> bdi').next().html() + ') ' + '<b class="caret"></b>'; // get the user name and identifier
    $user.html(user); // update the content by keeping only the informations above


    // Correct the trace.
    // Flush the new breadcrumb of all existing content.
    $('#new-breadcrumbs').each(function() {

      if ($(this).parent().hasClass('trace-element'))
        $(this).remove();
    });

    var $dw_breadcrumbs = $('#dokuwiki-breadcrumbs');
    var n = $dw_breadcrumbs.find('bdi').children().length;

    // Get all elements of the DokuWiki breadcrumb, for each retrive the link and add it to the new breadcrumb
    $dw_breadcrumbs.find('bdi').each(function(index) {

      if (n <= 1 || index !== 0) // don't display the first element when there is multiple element; DokuWiki always display the home page as the root which is not the real tree
        $('#new-breadcrumbs').append('<li class="trace-element">' + $(this).html() + '</li>');
    });

    // Remove the DokuWiki breadcrumb.
    $dw_breadcrumbs.remove();


    // Adjust the height
    var $dw_site = $('#dokuwiki__site');
    var height = $(window).height() - ($('#dokuwiki__header').height() + $('#dokuwiki__footer').height());
    $dw_site.find('.wrapper').css('min-height', height + 'px');


    // Add icons
    if ($('a.action.logout').length > 0) {

      // case where the user is logged in
      $('a.action.admin').prepend('<i class="fa fa-fw fa-wrench"></i>&nbsp;');
      $('a.action.profile').prepend('<i class="fa fa-fw fa-user"></i>&nbsp;');
      $('a.action.register').prepend('<i class="fa fa-fw fa-pencil-square-o"></i>&nbsp;');
      $('a.action.logout').prepend('<i class="fa fa-fw fa-sign-out"></i>&nbsp;');
    } else
      $('a.action.login').prepend('<i class="fa fa-fw fa-unlock-alt"></i>&nbsp;');


    // Correct pagetools position
    $.fn.absolutePosition = function() {

      var $dw_pagetools = $('#dokuwiki__pagetools');
      if ($dw_pagetools.hasClass('pg__fixed')) {

        $dw_pagetools.removeClass('pg__fixed');
        $dw_pagetools.removeAttr('style');
      }
    };

    $.fn.fixedPosition = function(leftPosition) {

      var $dw_pagetools = $('#dokuwiki__pagetools');
      if (!$dw_pagetools.hasClass('pg__fixed')) {

        $dw_pagetools.addClass('pg__fixed');
        $dw_pagetools.css('left', leftPosition);
      }
    };

    var $dw_pagetools = $('#dokuwiki__pagetools');
    if ($(window).width() < 1430)
      $dw_site.find('.wrapper.group').width($dw_site.find('.wrapper.group').width() - $dw_pagetools.width());

    // $().fixedPosition();
    var leftPosition = $dw_pagetools.offset().left;
    $(window).scroll(function() {

      if ($(window).scrollTop() > 73)
        $().fixedPosition(leftPosition);
      else if ($('#dokuwiki__pagetools').css('position') === 'fixed')
        $().absolutePosition();
    });
  });
};


window.onresize = function() {

  'use strict';

  // Adjust the height
  jQuery(function() {

    var height = $(window).height() - ($('#dokuwiki__header').height() + $('#dokuwiki__footer').height());
    $('#dokuwiki__site').find('.wrapper').css('min-height', height + 'px');
  });
};
