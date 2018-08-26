app.controller('MovieController', function ($http) {
    console.log('in MovieController');
    let vm = this;
    vm.movieCollection = [];
    vm.genreTableList = [];
    vm.toggleAction = false;

    vm.addMovie = function () {
        if (vm.toggleAction == false) {
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
        vm.toggleAction = true;
        /// an $mdDialog in here that captures this information in diff. ng-models, 
        /// will cause a delay that lets users figure out what they want to edit 
        /// right now, it goes straight through so causes errors 
        vm.movieTitle = movie.title;
        vm.genre_id = movie.genre_id;
        vm.movieTime = movie.run_time;
        vm.movieUrl = movie.image_url;
        if (vm.toggleAction == true) {
            let movieToUpdate = {
                title: vm.movieTitle,
                release_date: vm.movieDate,
                run_time: vm.movieTime,
                image_url: vm.movieUrl
            } //genre does not get updated here (yet)
            $http({
                method: 'PUT',
                url: '/movies/update/' + movie.id,
                data: movieToUpdate
            }).then(function (response) {
                console.log('back from the server with', response);
                getMovies();
                vm.toggleAction = false;
            }).catch(function (error) {
                console.log('Error updating movie', error);
            })
        }
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