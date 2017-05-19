var app = angular.module("exampleBlock", ["ngRoute"])
.config( ['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '../../html/main.html'
    })
    .when('/learnmore', {
      templateUrl: '../../html/learnmore.html'
    })
    .when('/edit', {
      templateUrl: '../../html/update.html'
    })
    .when('/addnew', {
      templateUrl: '../../html/add.html'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);

app.controller('dbCtrl', function($scope, $http, $location, $window, $route, fact) {
    $scope.curID = '5919dcdbacd9d5244073a552';
    fact.get().then(function (response) {
        $scope.data = response.data;
    });
    $scope.learnmoreClick = function(id) {
        $location.path('learnmore');
        $scope.curID = id;
    };
    $scope.edit = function(id) {
        $location.path('edit');
        $scope.curID = id;
    };
    $scope.home = function() {
        $location.path('/');
    };
    $scope.update = function(curID, picName, name, author, description, full) {
        fact.put(curID, picName, name, author, description, full);
        $window.location.reload();
        //$location.path('/');
    };
    $scope.addnew = function(name, author, description, full) {
        fact.post("standart.png", name, author, description, full);
        $window.location.reload();
        $location.path('/');
    };
    $scope.del = function(id) {
      fact.del(id);
      $window.location.reload();
    };
    $scope.add = function() {
      $location.path('addnew');
    }
});

app.factory("fact", function ($http) {
  this.get = function () {
    return $http.get('http://localhost:8080/api/example/');
  }

  this.getById = function (id) {
    return $http.get('http://localhost:8080/api/example/' + id);
  }

  this.post = function (pic, title, author, description, full) {
    return $http.post('http://localhost:8080/api/example/', {"picName" : pic, "description" : description, "author" : author, "name": title, "full" : full});
  }

  this.del = function (id) {
    return $http.delete('http://localhost:8080/api/example/' + id);
  }

  this.put = function (id, picName, title, author, description, full) {
    return $http.put('http://localhost:8080/api/example/' + id, {"picName" : picName, "description" : description, "author" : author, "name": title, "full": full});
  }

  return this;
});

app.directive("exBl", function(fact) {
    return {
        link: function (scope, element, attrs) {
          fact.getById(scope.x._id).then(function (response) {
            scope.d = response.data;
          });
        }
    };
});

app.directive("learnmore", function(fact) {
    return {
        link: function (scope, element, attrs) {
          fact.getById(scope.curID).then(function (response) {
            scope.d = response.data;
          });
        }
    };
});

app.directive("upd", function(fact) {
    return {
        link: function (scope, element, attrs) {
          fact.getById(scope.curID).then(function (response) {
            scope.d = response.data;
            scope.author = response.data.author;
            scope.name = response.data.name;
            scope.description = response.data.description;
            scope.full = response.data.full;
            scope.picName = response.data.picName;
          });
        }
    };
});
