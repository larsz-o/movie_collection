app.controller('MovieController', function ($http) {
    console.log('in MovieController');
    let vm = this;
    vm.movieCollection = [];
    vm.genreTableList = [];
    vm.toggleEdit = false;

    let movieToEdit = {
        id: 0, 
    }

    vm.addMovie = function () {
        if (vm.toggleEdit === false) {
            let movieToAdd = {
                title: vm.movieTitle,
                release_date: vm.movieDate,
                run_time: vm.movieTime,
                image_url: vm.movieUrl,
                genre_id: vm.movieGenre.id,
                ranking: '0',
                favorite: false
            }
            $http({
                method: 'POST',
                url: '/movies',
                data: movieToAdd
            }).then(function (response) {
                console.log('back from the server with', response);
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
        } else {
            movieToEdit.id = movieToEdit.id; 
            movieToEdit.title = vm.movieTitle;
            movieToEdit.release_date = vm.movieDate;
            movieToEdit.run_time = vm.movieTime;
            movieToEdit.image_url = vm.movieUrl;
            movieToEdit.genre_id = vm.movieGenre.id; 
            console.log(movieToEdit); 
            $http({
                method: 'PUT',
                url: '/movies/update/' + movieToEdit.id,
                data: movieToEdit
            }).then(function(response){
                console.log('back from the server with', response);
                getMovies();
                vm.movieTitle = '';
                vm.movieGenre = '';
                vm.movieDate = '';
                vm.movieTime = '';
                vm.movieUrl = '';
                vm.toggleEdit = false; 
            }).catch(function (error) {
                console.log('Error updating movie', error);
                alert('There was an error updating the movie.');
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
    vm.favorite = function (movie) {
        movie.favorite = !movie.favorite;
        $http({
            method: 'PUT',
            url: '/movies/' + movie.id,
            data: movie
        }).then(function (response) {
            getMovies();
        }).catch(function (error) {
            console.log('Error favoriting movie', error);
        })
    } // end favorite 
    vm.rankDown = function (movie) {
        if (movie.ranking >= 1 && movie.ranking <= 10) {
            movie.ranking = movie.ranking - 1;
            console.log('in rank down', movie);
            $http({
                method: 'PUT',
                url: '/movies/' + movie.id,
                data: movie
            }).then(function (response) {
                getMovies();
            }).catch(function (error) {
                console.log('Error updating ranking', error);
            })
        } else {
            alert('Movies can only be ranked 0-10');
        }
    }//end rankDown
    vm.rankUp = function (movie) {
        if (movie.ranking >= 0 && movie.ranking <= 9) {
            movie.ranking = movie.ranking + 1;
            $http({
                method: 'PUT',
                url: '/movies/' + movie.id,
                data: movie
            }).then(function (response) {
                getMovies();
            }).catch(function (error) {
                console.log('Error updating ranking', error);
            })
        } else {
            alert('Movies can only be ranked 0-10');
        }
    }// end rankUP
    vm.toggleFavorites = function (movie) {
        movie.favorite = !movie.favorite;
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
    } // end toggleFavorites 

    vm.updateMovie = function (movie) {
        vm.toggleEdit = true;
        movieToEdit.id = movie.id;
        vm.movieTitle = movie.title;
        vm.movieTime = movie.run_time;
        vm.movieUrl = movie.image_url;
    }
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