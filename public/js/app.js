var app = angular.module('medianSearch', ['ngRoute'])

.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/views/home.html',
            controller: 'formController'
        })
        .when('/politician/:polId', {
            templateUrl: '/views/profile.html',
            controller: 'profileController'
        })
})

app.factory('getPolitician', function($http) {
    return {
        requestAddress: function(add) {
            return $http({
                method: 'GET',
                url: 'http://localhost:3000/addLookUp',
                params: {
                    address: add
                }
            })
        },
        requestId: function(id) {
            return $http({
                method: 'GET',
                url: 'http://localhost:3000/idLookUp',
                params: {
                    id: id
                }
            });
        }
    };
});

app.controller('formController', function($scope, $http, getPolitician) {
    //Sets the placeholder
    $scope.address = 'Address Placeholder';
    $scope.searchTitle = 'Who Represents You?';

    if (localStorage.address) {
        var returnAddress = localStorage.address;
        getPolitician.requestAddress(returnAddress).success(function(data){
            $scope.politicians = data;
            $scope.searchTitle = 'These People Represent You';
        });
    }

    //ng-submit function for the address search form
    $scope.addLookUp = function() {
        //Gets the value of the input form
        var text = this.address;
        localStorage.setItem('address', text);

        //Uses the factory to get the data
        getPolitician.requestAddress(text).success(function(data) {
            console.log(data);
            $scope.politicians = data;
            $scope.searchTitle = 'These People Represent You';
        });
    };
});

app.controller('profileController', function($scope, $routeParams, getPolitician) {
    var id = $routeParams.polId;
    getPolitician.requestId(id).success(function(data){
        $scope.profile = data;
    });
});

