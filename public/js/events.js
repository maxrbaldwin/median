jQuery(function($) {
    var sideWidth = $('#sidebar').outerWidth(),
            sidePos = sideWidth * -1;

        $('#sidebar').css('left', sidePos);
    // Click function to show the sidebar
    $('#toggleOpen').click(function() {

        $('#fadeBack').fadeIn();
        $('#sidebar').animate({
            'left': '0'
        }, 500);
    });

    // Click function to hide the sidebar
    $('#toggleClose').click(function() {

        $('#fadeBack').fadeOut();
        $('#sidebar').animate({
            'left': sidePos
        }, 500)
    });
});
