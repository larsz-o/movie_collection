const app = angular.module('MovieApp', ['ngRoute']);
let genreCollection = [];

app.config(function($routeProvider){
    $routeProvider.when('/', {
        template: '<h2>Movie Collection Home</h2>'
    })
    .when('/movies', {
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