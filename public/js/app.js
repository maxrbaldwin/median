angular.module('medianSearch', ['ngRoute'])

.config(function($routeProvider) {
    $routeProvider
        .when('/', {controller: 'formController'})
        .when('/politician': 'profileController')
})

function formController($scope, $http) {
    //Sets the placeholder
    $scope.address = 'Address Placeholder';
    $scope.searchTitle = 'Who Represents You?';

    //ng-submit function for the address search form
    $scope.addLookUp = function() {
        //Gets the value of the input form
        var text = this.address;

        console.log(text);

        $http({
            method: 'GET',
            url: 'http://localhost:3000/addLookUp',
            params: {address: text}
        })
            .success(function(data, status) {
                $scope.createLayout = createSearchLayout($scope, data);
            })
            .error(function(data, status) {

            });

        //Resets the placeholder text back to original text
        $scope.address = '';

    };
}

function createSearchLayout($scope, data) {
    console.log(data);
    $scope.politicians = data;
    $scope.searchTitle = 'These People Represent You';
}

function profileController($scope) {

}
