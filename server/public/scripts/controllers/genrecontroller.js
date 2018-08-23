app.controller('GenreController', function ($http) {
    console.log('in GenreController');
    let vm = this;
    vm.genreCollection = [];

    vm.addGenre = function () {
        let newGenre = {
            genre: vm.genreIn
        }
        $http({
            method: 'POST',
            url: '/genres',
            data: newGenre
        }).then(function (response) {
            console.log('back from the server with', response);
            getGenres();
        }).catch(function (error) {
            console.log('Error posting genres', error);
        })
    } // end addGenre
    vm.deleteGenre = function(id){
        $http({
            method: 'DELETE',
            url: '/genres/' + id
        }).then(function(response){
            vm.genreCollection = response.data;
        }).catch(function(error){
            console.log('Error deleting genre', error); 
            alert('There was an error deleting this genre'); 
        })
    }//end deleteGenre
    function getGenres() {
        $http({
            method: 'GET',
            url: '/genres'
        }).then(function (response) {
            console.log('back from the server with', response.data);
            vm.genreCollection = response.data;
            vm.genreIn = '';
        }).catch(function (error) {
            console.log('error getting genres', error);
        })
    } // end getGenres
    getGenres(); 
})