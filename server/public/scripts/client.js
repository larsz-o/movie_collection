const app = angular.module('MovieApp', ['ngRoute']);

app.config(function($routeProvider){
    $routeProvider.when('/', {
        templateUrl: 'views/movies.html',
        controller: 'MovieController as mc'
    })
    .when('/genres', {
        templateUrl: 'views/genres.html', 
        controller: 'GenreController as gc'
    })
    .otherwise({
        template: '<h2>404: Page not found.</h2>'
    })
})