app.controller('FavoritesController', function ($http) {
    console.log('in FavoritesController');
    let vm = this;
    vm.movieCollection = [];

    vm.unFavorite = function (movie){
            movie.favorite = !movie.favorite;
            if(confirm('Are you sure you want to unfavorite this movie?')){
                $http({
                    method: 'PUT',
                    url: '/movies/' + movie.id,
                    data: movie
                }).then(function (response) {
                    console.log('back from the server with', response);
                    getMovies(); 
                }).catch(function (error) {
                    console.log('Error marking favorite', error);
                })
            }
        } // end unFavorite 
    
    function getMovies() {
        $http({
            method: 'GET',
            url: '/movies'
        }).then(function (response) {
            vm.movieCollection = response.data;
        }).catch(function (error) {
            console.log('Error getting movies', error);
            alert('There was an error retrieving the movies');
        })
    }// end getMovies 
    getMovies();
})