angular.module('formHandler', [])

.controller('formController', ['$scope', '$http', function($scope, $http){
    //Sets the placeholder
    $scope.text = 'Address Placeholder';

    $scope.method = 'GET';
    $scope.key1 = 'AIzaSyABzqPqDUJ_teyqNMgY1oVxyUESsvcn_so';

    //ng-submit function for the address search form
    $scope.addLookUp = function() {
        //Gets the value of the input form
        $scope.address = encodeURIComponent(this.address);
        $scope.url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + $scope.address + '&key=' + $scope.key1;

        console.log($scope.url);

        //Resets the placeholder text back to original text
        $scope.address = $scope.text;

    };
}]);