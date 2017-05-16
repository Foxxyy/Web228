var app = angular.module("exampleBlock", ["ngRoute"])
.config( ['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/learnmore', {
      templateUrl: '../../html/learnmore.html'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);

app.controller('dbCtrl', function($scope, $http, $location, $window) {
    $http.get("http://localhost:8080/api/example/").then(function (response) {
        $scope.data = response.data;
    });
    $scope.learnmoreClick = function() {
        $location.path('learnmore');
        //$window.open('http://localhost:3000/learnmore', '_blank');
    };
    $scope.edit = function(id) {
        $http.get("http://localhost:8080/api/example/" + id).then(function (response) {
          $scope.one = response;
        })
    };
});

app.directive("exBl", function() {
    return {
        template : '<img src="img/{{x.picName}}">' +
        '<h2> {{ x.name }} </h2>' +
        '<h3>{{x.author}}</h3>' +
        '<p>{{x.description}}</p>' +
        '<button ng-click="learnmoreClick()">LEARN MORE</button>'+
        '<a href="../../update.html" ng=click="edit({{x.id}})">edit</a>'
    };
});

app.directive("upd", function() {
    return {
        template : '<input value="{{one.name}}"><br>' +
        '<input value="{{one.author}}"><br>' +
        '<input value="{{one.description}}"><br>'
    };
});
/*
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "index.html"
    })
    .when("/learnmore", {
        templateUrl : "../../html/learnmore.html"
    });
});*/
