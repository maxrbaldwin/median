angular.module('formHandler', [])

.controller('formController', ['$scope', '$http',
    function($scope, $http) {
        //Sets the placeholder
        $scope.text = 'Address Placeholder';

        var method = 'GET',
            key1 = 'AIzaSyABzqPqDUJ_teyqNMgY1oVxyUESsvcn_so',
            key2 = 'c833fc6b098b4c2d9fbcaf1087f1ff29';

        //ng-submit function for the address search form
        $scope.addLookUp = function() {
            //Gets the value of the input form
            var address = encodeURIComponent(this.address),
                url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + key1;

            $http({
                method: method,
                url: url,
                responseType: 'json'
            })
                .success(function(data, status) {
                    var lat = data.results[0].geometry.location.lat,
                        long = data.results[0].geometry.location.lng,
                        url2 = 'http://openstates.org/api/v1/legislators/geo/?lat=' + lat + '&long=' + long;

                    console.log(lat);
                    console.log(long);
                    console.log(url2);

                    $http({
                        method: method,
                        url: url2,
                        params: {
                            apikey: key2
                        }
                    })
                        .success(function(data, status) {
                            console.log(data);
                            console.log(status);
                        })
                        .error(function(data, status) {
                            console.log(data, status);
                        });
                })
                .error(function(data, status) {
                    console.log(data + ' failure');
                    console.log(status + ' failure');
                });

            //Resets the placeholder text back to original text
            $scope.address = $scope.text;

        };
    }
]);
