app.controller('MovieController', function ($http) {
    console.log('in MovieController');
    let vm = this;
    vm.movieCollection = [];

    vm.addMovie = function () {
        let movieToAdd = {
            title: vm.movieTitle,
            release_date: vm.movieDate,
            run_time: vm.movieTime,
            image_url: vm.movieUrl,
            genre_id: vm.movieGenre
        }
        $http({
            method: 'POST',
            url: '/movies',
            data: movieToAdd
        }).then(function () {
            getMovies(); 
            vm.movieTitle ='';
            vm.movieGenre = '';
            vm.movieDate = '';
            vm.movieTime = '';
            vm.movieUrl = '';
        }).catch(function (error) {
            console.log('Error posting movie', error);
            alert('There was an error posting the movie.');
        })
    }//end addMovie
    function getMovies() {
        $http({
            method: 'GET',
            url: '/movies'
        }).then(function (response) {
            vm.movieCollection = response.data;
        }).catch(function(error){
            console.log('Error getting movies', error);
            alert('There was an error retrieving the movies'); 
        })
    }// end getMovies 
getMovies(); 
})