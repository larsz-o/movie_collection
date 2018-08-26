const app = angular.module('MovieApp', ['ngRoute', 'ngMaterial', 'ngMessages']);

app.config(function ($routeProvider, $mdThemingProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/home.html'
    })
        .when('/movies', {
            templateUrl: 'views/movies.html',
            controller: 'MovieController as mc'
        })
        .when('/genres', {
            templateUrl: 'views/genres.html',
            controller: 'GenreController as gc'
        })
        .when('/favorites', {
            templateUrl: 'views/favorites.html',
            controller: 'FavoritesController as fc'
        })
        .otherwise({
            template: '<h2>404: Page not found.</h2>'
        })
    $mdThemingProvider.theme('default')
        .primaryPalette('blue-grey')
        .accentPalette('teal');

});
