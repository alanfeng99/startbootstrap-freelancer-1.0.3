var app = angular.module('MyApp', ['ngRoute', 'firebase']);

app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/', {
            controller: 'mainController',
            templateUrl: 'main.html'
        })
        .otherwise({
            redirectTo: '/'
        });
    }]);

app.controller('mainController', function ($scope,$firebaseArray,$location) {
    
    var ref = new Firebase("https://freelance-demo.firebaseio.com/users");
    
    // create a synchronized array
    $scope.users = $firebaseArray(ref);
    
    // add new items to the array
    // the message is automatically added to our Firebase database!
    $scope.submit = function() {
        
        $scope.users.$add({
          name: $scope.inputName,
          image_url: $scope.inputImageUrl,
          phone: $scope.inputPhone,
          description: $scope.inputDescription,
          email: $scope.inputEmail
        });
        $location.hash('portfolio');
    };
});