function resize() {

    var windowWidth = $(window).width(),
        windowHeight = $(window).height(),
        parentHeight = $('.parent').height(),
        parentWidth = $('.parent').width(),
        topHeight = (windowHeight - parentHeight) / 2;

    $('.section').width(windowWidth).height(windowHeight);
    $('.section').css('padding-top', topHeight);

}

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

// $(function() {
//     $('#searchAddress').submit(function(e) {
//         var address = $('#address').val(),
//             split = address.split(" ");

//         for (i = 0; i < split.length; i++) {
//             console.log(split[i]);
//             var link = 'www.facebook.com?text=' + split[i] + '+';
//         }

//         console.log(link + ' <--- This is the link');

//         e.preventDefault();
//     });
// });


function sidebar() {
    var windowHeight = $(window).height(),
        sideWidth = $('#sidebar').width();
}
