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
  var $handle = $('#dokuwiki__aside h3.toggle');
  var $toc = $('#dw__toc h3');

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
    $('#dw__search > .no').addClass('input-group'); // add lacking class
    $('#qsearch__in').addClass('form-control'); // add lacking class
    $('#qsearch__in').attr('placeholder', $('#dw__search > .no > .button').attr('value')); // add a placeholder
    $('#dw__search > .no > .button').remove(); // remove useless element


    // Correct the user menu.
    var user = $('#user > bdi').html() + ' (' + $('#user > bdi').next().html() + ') ' + '<b class="caret"></b>'; // get the user name and identifier
    $('#user').html(user); // update the content by keeping only the informations above


    // Correct the trace.
    // Flush the new breadcrumb of all existing content.
    $('#new-breadcrumbs').each(function() {

      if ($(this).parent().hasClass('trace-element'))
        $(this).remove();
    });

    var n = $('#dokuwiki-breadcrumbs bdi').children().length;

    // Get all elements of the DokuWiki breadcrumb, for each retrive the link and add it to the new breadcrumb
    $('#dokuwiki-breadcrumbs bdi').each(function(index) {

      if (n <= 1 || index !== 0) // don't display the first element when there is multiple element; DokuWiki always display the home page as the root which is not the real tree
        $('#new-breadcrumbs').append('<li class="trace-element">' + $(this).html() + '</li>');
    });

    // Remove the DokuWiki breadcrumb.
    $('#dokuwiki-breadcrumbs').remove();


    // Adjust the height
    var height = $(window).height() - ($('#dokuwiki__header').height() + $('#dokuwiki__footer').height());
    $('#dokuwiki__site .wrapper').css('min-height', height + 'px');


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

      if ($('#dokuwiki__pagetools').hasClass('pg__fixed')) {

        $('#dokuwiki__pagetools').removeClass('pg__fixed');
        $('#dokuwiki__pagetools').removeAttr('style');
      }
    };

    $.fn.fixedPosition = function(leftPosition) {

      if (!$('#dokuwiki__pagetools').hasClass('pg__fixed')) {

        $('#dokuwiki__pagetools').addClass('pg__fixed');
        $('#dokuwiki__pagetools').css('left', leftPosition);
      }
    };

    if ($(window).width() < 1430)
      $('#dokuwiki__site .wrapper.group').width($('#dokuwiki__site .wrapper.group').width() - $('#dokuwiki__pagetools').width());

    // $().fixedPosition();
    var leftPosition = $('#dokuwiki__pagetools').offset().left;
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
    $('#dokuwiki__site .wrapper').css('min-height', height + 'px');
  });
};