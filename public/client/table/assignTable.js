angular.module('seating.tables',[])

.controller('TableController', function($scope, $http, Display){
  $scope.tables = {
    guestlist: []
  };

  $scope.getGuests = function(){
    Display.display()
    .then(function(guestlist){
      $scope.tables.guestlist = guestlist;
      console.log("guests: ", $scope.tables.guestlist);
    });
  };

  $scope.getGuests();


});