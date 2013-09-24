var {pageNameTransformed} = module.exports = angular.module('{projectName}.{pageName}', []);

{pageNameTransformed}.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: '/assets/{pageName}/template.html',
    controller: '{pageNameTransformed}Controller'
  });
}]);

{pageNameTransformed}.controller('{pageNameTransformed}Controller', ['$scope', function($scope) {
}]);
