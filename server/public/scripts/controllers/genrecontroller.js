app.controller('GenreController', function ($http, $mdDialog) {
    console.log('in GenreController');
    let vm = this;
    vm.genreTableList = [];

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
            vm.genreIn = '';
        }).catch(function (error) {
            console.log('Error posting genres', error);
        })
    } // end addGenre
    vm.deleteGenre = function (id) {
        if (confirm('Are you sure you want to delete this genre and all associated movies?')) {
            $http({
                method: 'DELETE',
                url: '/genres/' + id
            }).then(function (response) {
                vm.genreTableList = response.data;
                getGenres();
            }).catch(function (error) {
                console.log('Error deleting genre', error);
                alert('There was an error deleting this genre');
            })
        }
    }
    //end deleteGenre
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
    vm.updateGenre = function (event, id) {
        console.log(id);
        // Appending dialog to document.body to cover sidenav in docs app
        let confirm = $mdDialog.prompt()
            .title('What would you like to change this genre to?')
            .textContent('Romantic Dramedies are always popular.')
            .placeholder('Genre name')
            .ariaLabel('Genre name')
            .targetEvent(event)
            .required(true)
            .ok('Confirm')
            .cancel('Cancel');

        $mdDialog.show(confirm).then(function (result) {
            $http({
                method: 'PUT',
                url: '/genres/' + id,
                data: { genre: result }
            }).then(function (response) {
                console.log('back from the server with', response);
                getGenres();
            }).catch(function (error) {
                console.log('Error updating movie', error);
            })
        })
    };



    getGenres();
})