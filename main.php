<?php

    /**
     * JEECE DokuWiki template 2014
     *
     * @link     http://dokuwiki.org/template
     * @author   Théo FIDRY <theo.fidry@gmail.com>
     * @license  GPL 2 (http://www.gnu.org/licenses/gpl.html)
     */

    // check if is run form within DokuWiki
    if (!defined('DOKU_INC')) die();

    header('X-UA-Compatible: IE=edge,chrome=1');

    // check if has a sidebar and show it if it's the case
    $hasSidebar = page_findnearest($conf['sidebar']);
    $showSidebar = $hasSidebar && ($ACT=='show');
?>

<!DOCTYPE html>
<html lang="<?php echo $conf['lang'] ?>" dir="<?php echo $lang['direction'] ?>" class="no-js">
    <head>
        <!-- Include meta data -->
        <?php tpl_includeFile('meta.html') ?>
    </head>
    <body>

        <!--[if lte IE 7 ]><div id="IE7"><![endif]--><!--[if IE 8 ]><div id="IE8"><![endif]-->
        <div id="dokuwiki__site">
            <div id="dokuwiki__top" class="site <?php echo tpl_classes(); ?> <?php echo ($showSidebar)? 'showSidebar': ''; ?> <?php echo ($hasSidebar)? 'hasSidebar': ''; ?>">

                <!-- HEADER -->
                <?php include('header.html') ?>

                <div class="wrapper group">

                    <!-- SIDEBAR -->
                    <?php include('sidebar.html') ?>

                    <!-- CONTENT -->
                    <?php include('page.html') ?>

                    <!-- PAGE ACTIONS -->
                    <?php include('page_actions.html'); ?>
                </div>    <!-- /.wrapper.group -->

                <?php include('tpl_footer.php') ?>
            </div>    <!-- /#dokuwiki__top -->
        </div>    <!-- /#dokuwiki__site -->

        <!-- provide DokuWiki housekeeping, required in all templates -->
        <div class="no"><?php tpl_indexerWebBug() ?></div>

        <!-- helper to detect CSS media query in script.js -->
        <div id="screen__mode" class="no"></div>

        <!--[if ( lte IE 7 | IE 8 ) ]></div><![endif]-->
    </body>
</html>
