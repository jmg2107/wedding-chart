angular.module('seating.tables',[])

.controller('TableController', function($scope, $http, Display){
  $scope.tables = {
    guestlist: [],
    numTables: 0,
    tableCol: {}
  };

  $scope.getGuests = function(){
    Display.display()
    .then(function(guestlist){
      $scope.tables.guestlist = guestlist;
      console.log("guests: ", $scope.tables.guestlist);
      $scope.tables.numTables = Math.ceil($scope.tables.guestlist.length/10);
      console.log("numTabls is ", $scope.tables.numTables);
    });
  };

  $scope.getGuests();


});