var config = {
    apiKey: "AIzaSyBfNl8ObHz2CJHoFxR-t6zKMBpJLnQ6IQ0",
    authDomain: "opendatabase-cd4b1.firebaseapp.com",
    databaseURL: "https://opendatabase-cd4b1.firebaseio.com",
    projectId: "opendatabase-cd4b1",
    storageBucket: "opendatabase-cd4b1.appspot.com",
    messagingSenderId: "155917647800"
};
firebase.initializeApp(config);

angular.module('datasourcesApp', ["firebase"])

    .controller('mainController', function($scope, $firebaseArray) {
        const rootRef = firebase.database().ref().child("datasources");

        $scope.datasources = $firebaseArray(rootRef);

        $scope.sortType = 'name'; // set the default sort type
        $scope.sortReverse = false; // set the default sort order
        $scope.searchTerm = ''; // set the default search/filter term
        // maybe use own small database that includes all the categories here instead?
        $scope.categoryFilter = new Set(["Government", "Research Output", "Health", "Facts"]);

        $scope.showData = function(datasource) {
            return $scope.categoryFilter.has(datasource.category) &&
                (datasource.name.includes($scope.searchTerm) ||
                    datasource.description.includes($scope.searchTerm) ||
                    datasource.link.includes($scope.searchTerm));
        };

        $scope.toggleCategory = function($event, category) {
            if (!$scope.categoryFilter.delete(category)) { // is true if category was not present in categoryFilter
                $scope.categoryFilter.add(category);
                $event.target.classList.remove('disabled');
            } else {
                $event.target.classList.add('disabled');
            }
        };
    });
