// Click function to show the sidebar
$('#toggleOpen').click(function(){

    $('#fadeBack').fadeIn();
    $('#sidebar').animate({
        'left': '0'
    }, 500);
});

// Click function to hide the sidebar
$('#toggleClose').click(function(){
    sideWidth = $('#sidebar').outerWidth(),
        sidePos = sideWidth * -1;

    $('#fadeBack').fadeOut();
    $('#sidebar').animate({
        'left': sidePos
    }, 500)
});

// Submit function for the address search on the homepage
$('#searchAddress').submit(function() {
    var input = $('#address').val(),
        address = encodeURIComponent(input),
        key1 = 'AIzaSyABzqPqDUJ_teyqNMgY1oVxyUESsvcn_so',
        key2 = 'c833fc6b098b4c2d9fbcaf1087f1ff29';

    console.log(address + ' <- Address');
    console.log(input+ ' <- input');

    $.ajax({
        url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + key1,
        type: 'GET',
        dataType: 'json'
    })
        .done(function(data) {
            var data = data,
                lat = data.results[0].geometry.location.lat,
                long = data.results[0].geometry.location.lng,
                url = 'http://openstates.org/api/v1/legislators/geo/?lat=' + lat + '&long=' + long;

            console.log(lat + ' lat');
            console.log(long + ' long');
            console.log(url);

            $.ajax({
                url: url,
                type: 'GET',
                data: {
                    apikey: key2
                },
            })
                .done(function(data2) {
                    console.log(data2);
                    console.log('DONE!');
                })
                .fail(function() {
                    console.log("error");
                })

        })
        .fail(function() {
            console.log("error");
        });

    return false;

});