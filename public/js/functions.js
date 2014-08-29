function resize() {

    var windowWidth = $(window).outerWidth(),
        windowHeight = $(window).outerHeight(),
        parentHeight = $('.parent').outerHeight(),
        parentWidth = $('.parent').outerWidth(),
        sideWidth = $('#sidebar').outerWidth(),
        sidePos = sideWidth * -1;
        topHeight = (windowHeight - parentHeight) / 2;

    $('.section').outerWidth(windowWidth).outerHeight(windowHeight);
    $('.sectionContainer').css('top', topHeight);

    $('#sidebar').css({
        'left': sidePos,
        'height': windowHeight
    });

    $('#fadeBack').css({
        'width': windowWidth,
        'height': windowHeight
    });

}
