var array_object___configuration = [],
    search_form_index = 0;

$(document).ready(function() {

    $("#searchButton").on('click', function(e) {
        e.preventDefault();
        $('form')[search_form_index].submit();
    });

    $("#review_submit").on('click', function(e) {
        e.preventDefault();
        $("#review_submit").closest('form').submit()
    });

    $("#compareSeleted").on('click', function(e) {
        e.preventDefault();

        if ($("input[name='selectedPlans[]']:checkbox:checked").length < 2)
            alert('You must select at least two plans for compare')
        else
            $("#comparePlansForm").submit();
    });

    jQuery(function () {
        var a_sort = $('#sortingContainer span');
        var div_container = jQuery.makeArray($('#resultContainer div.resultItem'));
        a_sort.each(function (index, self) {
            var sort_mode = $(self).parent().attr("data-sort");
            $(self).parent().on('click', function (e) {
                e.preventDefault();
                div_container.sort(function f(a, b) {
                    a = $(a).data(sort_mode);
                    b = $(b).data(sort_mode);
                    var c = 0
                    if (a > b) c = 1;
                    if (a < b) c = -1;
                    return c
                });
                /*TODO Это нужно для сортировки в обратном порядке. Надо ли нам это?*/
                //if (index%2) div_container.reverse()
                $.map(div_container, function (div) {
                    $(div).appendTo($('#resultContainer'))
                });
            });
        });
    });

});

