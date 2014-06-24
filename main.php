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

        <meta charset="utf-8" />

        <!-- Set the matadata of the page -->
        <title><?php tpl_pagetitle() ?> [<?php echo strip_tags($conf['title']) ?>]</title>

        <!-- Check if the JS is enabled by removing the 'no-js' class with JS -->
        <script>(function(H){H.className=H.className.replace(/\bno-js\b/,'js')})(document.documentElement)</script>

        <!-- load the stylesheets and JS required and provided by DokuWiki; DokuWiki dispatcher -->
        <?php tpl_metaheaders() ?>

        <meta name="viewport" content="width=device-width,initial-scale=1" />

        <!-- load the favicon; DokuWiki dispatcher -->
        <?php echo tpl_favicon(array('favicon', 'mobile')) ?>

        <!-- include DokuWiki meta file -->
        <?php tpl_includeFile('meta.html') ?>
    </head>
    <body>

        <!--[if lte IE 7 ]><div id="IE7"><![endif]--><!--[if IE 8 ]><div id="IE8"><![endif]-->
        <div id="dokuwiki__site">
            <div id="dokuwiki__top" class="site <?php echo tpl_classes(); ?> <?php echo ($showSidebar) ? 'showSidebar' : ''; ?> <?php echo ($hasSidebar) ? 'hasSidebar' : ''; ?>">

                <!-- include the header -->
                <?php include('tpl_header.php') ?>

                <div class="wrapper group">

                    <!-- ********** SIDEBAR ********** -->
                    <?php if($showSidebar): ?>

                        <div id="dokuwiki__aside">
                            <div class="pad aside include group">
                                <h3 class="toggle"><?php echo $lang['sidebar'] ?></h3>
                                <div class="content">
                                    <?php tpl_flush() ?>
                                    <?php tpl_includeFile('sidebarheader.html') ?>
                                    <?php tpl_include_page($conf['sidebar'], 1, 1) ?>
                                    <?php tpl_includeFile('sidebarfooter.html') ?>
                                </div>
                            </div>    <!-- /.aside -->
                        </div>    <!-- /#dokuwiki__aside -->
                    <?php endif; ?>


                    <!-- ********** CONTENT ********** -->
                    <div id="dokuwiki__content">
                        <div class="pad group">

                            <!-- show the page ID -->
                            <div class="pageId">
                                <span><?php echo hsc($ID) ?></span>
                            </div>

                            <!-- show the page content -->
                            <div class="page group">

                                <?php tpl_flush() ?>
                                <?php tpl_includeFile('pageheader.html') ?>

                                <!-- wikipage -->
                                <?php tpl_content() ?>

                                <?php tpl_includeFile('pagefooter.html') ?>
                            </div>

                            <!-- show the information about when the last page has been modified -->
                            <div class="docInfo"><?php tpl_pageinfo() ?></div>

                            <?php tpl_flush() ?>
                        </div>    <!-- /.pad .group -->
                    </div>    <!-- /#dokuwiki__content -->

                    <hr class="a11y" />

                    <!-- ********** PAGE ACTIONS ********** -->
                    <div id="dokuwiki__pagetools">

                        <h3 class="a11y"><?php echo $lang['page_tools']; ?></h3>
                        <div class="tools">
                            <ul>
                                <?php
                                    $data = array('view'  => 'main',
                                                  'items' => array(
                                                      'edit'      => tpl_action('edit',      1, 'li', 1, '<span>', '</span>'),
                                                      'revert'    => tpl_action('revert',    1, 'li', 1, '<span>', '</span>'),
                                                      'revisions' => tpl_action('revisions', 1, 'li', 1, '<span>', '</span>'),
                                                      'backlink'  => tpl_action('backlink',  1, 'li', 1, '<span>', '</span>'),
                                                      'subscribe' => tpl_action('subscribe', 1, 'li', 1, '<span>', '</span>'),
                                                      'top'       => tpl_action('top',       1, 'li', 1, '<span>', '</span>')
                                    ));

                                    // the page tools can be amended through a custom plugin hook
                                    $evt = new Doku_Event('TEMPLATE_PAGETOOLS_DISPLAY', $data);
                                    if ($evt->advise_before())
                                        foreach($evt->data['items'] as $k => $html)
                                            echo $html;
                                    $evt->advise_after();

                                    unset($data);
                                    unset($evt);
                                ?>
                            </ul>
                        </div>    <!-- /.tools -->
                    </div>    <!-- /#dokuwiki__pagetools -->
                </div>    <!-- /wrapper -->

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
