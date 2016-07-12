angular.module('seating.guests',[])

.controller('GuestController', function($scope, $http, Display){
  $scope.guests = {
    name: "testname",
    guestlist: []
  };
  $scope.input = function(name){
    $scope.guests.name = name;
    $scope.send();
  };
  $scope.send = function(){
     return $http({
      method: 'POST',
      url: '/api/guests',
      data: $scope.guests
    })
    .then(function () {
      console.log("created new Guest");
      $scope.getGuests();
    });
  };
  $scope.getGuests = function(){
    Display.display()
    .then(function(guestlist){
      $scope.guests.guestlist = guestlist;
      console.log("guests: ", $scope.guests.guestlist);
    });
  };

  $scope.getGuests();

});