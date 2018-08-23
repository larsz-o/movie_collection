app.controller('MovieController', function($http){
    console.log('in MovieController');
    let vm = this; 
    
    vm.addMovie = function(){
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
        }).then(function(){
            //get movies 
        }).catch(function(error){
            console.log('Error posting movie', error);
            alert('There was an error posting the movie.'); 
        })
    }//end addMovie


})