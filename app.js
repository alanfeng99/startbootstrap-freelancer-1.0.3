/*global angular*/
/*global Firebase*/

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

app.controller('mainController', function ($scope,$firebaseArray,$location,anchorSmoothScroll) {
    
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
        
        anchorSmoothScroll.scrollTo('portfolio');
    };
    
    $scope.gotoElement = function (eID){
      // call $anchorScroll()
      anchorSmoothScroll.scrollTo(eID);
      
    };
});

app.service('anchorSmoothScroll', function(){
    
    this.scrollTo = function(eID) {

        // This scrolling function 
        // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript
        
        var startY = currentYPosition();
        var stopY = elmYPosition(eID);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        var speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for ( var i=startY; i<stopY; i+=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for ( var i=startY; i>stopY; i-=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }
        
        function currentYPosition() {
            // Firefox, Chrome, Opera, Safari
            if (self.pageYOffset) return self.pageYOffset;
            // Internet Explorer 6 - standards mode
            if (document.documentElement && document.documentElement.scrollTop)
                return document.documentElement.scrollTop;
            // Internet Explorer 6, 7 and 8
            if (document.body.scrollTop) return document.body.scrollTop;
            return 0;
        }
        
        function elmYPosition(eID) {
            var elm = document.getElementById(eID);
            var y = elm.offsetTop;
            var node = elm;
            while (node.offsetParent && node.offsetParent != document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            } return y;
        }

    };
    
});