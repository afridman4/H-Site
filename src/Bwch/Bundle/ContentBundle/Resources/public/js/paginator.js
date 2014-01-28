function BWCH_Paginator() {

    var $=this;

        $.currentPage = 0,
        $.pagesCount = 0,
        $.pageSize = 0,

        $.paginationElements = '.resultItem',
        $.prevPageElementClass = '.class_th___component-Paginator-control__show_previous_page',
        $.nextPageElementClass = '.class_th___component-Paginator-control__show_next_page',

        $.pageElementPrefix = '.class___element-pagination-index__',
        $.pageElementsClass = '.class_td___component-Paginator--navigation_items--item',
        $.pageElementSelectedClass = 'class___element-status__selected'
        ;

    $.ShowNextPage = function() {
        $.ShowPage($.currentPage + 1);
    }

    $.ShowPrevPage = function() {
        $.ShowPage($.currentPage - 1);
    }

    $.ShowPage = function(pageIndex) {

        if (pageIndex != $.currentPage
            &&
            pageIndex > 0
            &&
            pageIndex <= $.pagesCount
        ) {
            jQuery($.pageElementPrefix + $.currentPage).find('b').removeClass($.pageElementSelectedClass);
            jQuery($.pageElementPrefix + pageIndex).find('b').addClass($.pageElementSelectedClass);

            $.currentPage = pageIndex;

            var to = $.currentPage * $.pageSize,
                from = ($.currentPage - 1 ) * $.pageSize + 1;

            jQuery($.paginationElements).each(function (i) {
                var scheme = jQuery(this);
                if (i<from || i>to)
                    scheme.hide();
                else
                    scheme.show();
            });
        }

    }

    $.Init = function(o) {

        $.currentPage = o.currentPage;
        $.pagesCount = o.pagesCount;
        $.pageSize = o.pageSize;


        jQuery($.prevPageElementClass).on('click', function(e) {
            e.preventDefault();

            $.ShowPrevPage();
        });

        jQuery($.nextPageElementClass).on('click', function(e) {
            e.preventDefault();

            $.ShowNextPage();
        });

        jQuery($.pageElementsClass).on('click', function(e) {
            e.preventDefault();

            $.ShowPage(parseInt(jQuery(this).find('b').html()));
        });

    }

}
