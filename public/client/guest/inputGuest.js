angular.module('seating.guests',[])

.controller('GuestController', function($scope, $http){
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
      $scope.display();
    });
  };
  $scope.display = function(){
    return $http({
      method: 'GET',
      url: '/api/guests',
    })
    .then(function (res) {
      console.log("res data is ", res);
      $scope.guests.guestlist = res.data;
      console.log("guestlist = ", $scope.guests.guestlist);
      return res.data;
    });
  };

  $scope.display();


});