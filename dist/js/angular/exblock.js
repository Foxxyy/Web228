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

app.controller('dbCtrl', function($scope, $http, $location, $window, fact) {
    fact.get().then(function (response) {
        $scope.data = response.data;
    });
    //$scope.data = fact.get.data;
    //console.log($scope.data);
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

app.factory("fact", function ($http) {
  this.get = function () {
    return $http.get('http://localhost:8080/api/example/');
  }

  this.getById = function (id) {
    return $http.get('http://localhost:8080/api/example/' + id);
  }

  this.post = function (pic, title, author, description) {
    return $http.post('http://localhost:8080/api/example/', {"picName" : pic, "description" : description, "author" : author, "name": title});
  }

  this.del = function (id) {
    return $http.delete('http://localhost:8080/api/example/' + id);
  }

  this.put = function (id) {
    return $http.put('http://localhost:8080/api/example/' + id, {"picName" : pic, "description" : description, "author" : author, "name": title});
  }

  return this;
});

app.directive("exBl", function(fact) {
    return {
        template : '<img src="img/{{d.picName}}">' +
        '<h2> {{d.name}} </h2>' +
        '<h3>{{d.author}}</h3>' +
        '<p>{{d.description}}</p>' +
        '<button ng-click="learnmoreClick()">LEARN MORE</button>'+
        '<a href="../../update.html" ng=click="edit({{x.id}})">edit</a>',
        link: function (scope) {
          fact.getById(scope.x._id).then(function (response) {
            scope.d = response.data;
          });
        }
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
