app.controller('MovieController', function ($http) {
    console.log('in MovieController');
    let vm = this;
    vm.movieCollection = [];
    vm.genreTableList = [];
    vm.toggleAction = false; 

    vm.addMovie = function () {
        let movieToAdd = {
            title: vm.movieTitle,
            release_date: vm.movieDate,
            run_time: vm.movieTime,
            image_url: vm.movieUrl,
            genre_id: vm.movieGenre.id,
            ranking: '0',
        }
        if (vm.toggleAction == false){
            $http({
                method: 'POST',
                url: '/movies',
                data: movieToAdd
            }).then(function () {
                getMovies();
                vm.movieTitle = '';
                vm.movieGenre = '';
                vm.movieDate = '';
                vm.movieTime = '';
                vm.movieUrl = '';
            }).catch(function (error) {
                console.log('Error posting movie', error);
                alert('There was an error posting the movie.');
            })
        }
    }//end addMovie
    vm.deleteMovie = function (id) {
        if (confirm('Are you sure you want to delete this movie?')) {
            $http({
                method: 'DELETE',
                url: '/movies/' + id
            }).then(function (response) {
                getMovies();
            }).catch(function (error) {
                console.log('Error deleting movie', error)
            })
        }
    }//end deleteMovie
    vm.rankDown = function(movie){
        movie.ranking = movie.ranking - 1; 
        console.log('in rank down', movie);
        $http({
            method: 'PUT',
            url: '/movies/' + movie.id,
            data: movie
        }).then(function(response){
            getMovies(); 
        }).catch(function(error){
            console.log('Error updating ranking', error); 
        })
    }
    vm.rankUp = function(movie){
        movie.ranking = movie.ranking + 1; 
        $http({
            method: 'PUT',
            url: '/movies/' + movie.id,
            data: movie
        }).then(function(response){
            getMovies(); 
        }).catch(function(error){
            console.log('Error updating ranking', error); 
        })
    }
    vm.updateMovie = function(id){
        vm.toggleAction = true; 
   
        $http({
            method: 'PUT', 
            url: '/movies/'+ id, 
            data: movieToEdit
        }).then(function(response){
            console.log('back from the server with', response); 
            getMovies(); 
            vm.toggleAction = false;
        }).catch(function(error){
            console.log('Error updating movie', error); 
        })
    }//end updateMovie
    function getGenres() {
        $http({
            method: 'GET',
            url: '/genres'
        }).then(function (response) {
            console.log('back from the server with', response.data);
            vm.genreTableList = response.data;
            vm.genreIn = '';
        }).catch(function (error) {
            console.log('error getting genres', error);
        })
    } // end getGenres 
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


    getGenres();
    getMovies();

})