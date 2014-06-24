<?php

    // must be run from within DokuWiki
    if (!defined('DOKU_INC')) die();
?>

<!-- ********** FOOTER ********** -->
<div id="dokuwiki__footer">
    <div class="pad">

        <!-- show the licence used -->
        <?php tpl_license(''); // license text ?>
    </div>  <!-- /.pad -->
</div>  <!-- /#dokuwiki__footer -->

<?php
    // include DokuWiki footer
    tpl_includeFile('footer.html');
?>

<script src="http://code.jquery.com/jquery-latest.min.js"></script>
<script src="<?php echo tpl_getMediaFile(array("js/app.min.js")); ?>"></script>
