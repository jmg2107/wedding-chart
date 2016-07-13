angular.module('seating.guests',[])

.controller('GuestController', function($scope, $http, Display){
  $scope.guests = {
    name: "testname",
    guestlist: []
  };
  $scope.input = function(name){
    $scope.guests.name = name;
    $scope.send($scope.guests);
  };
  $scope.send = function(data){
     return $http({
      method: 'POST',
      url: '/api/guests',
      data: data
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
  $scope.remove = function(name){
    var guestDel = {};
    guestDel['name'] = name;
    $scope.send(guestDel);
  };


  $scope.getGuests();

});