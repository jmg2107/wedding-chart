var app = angular.module('seating', [
  'seating.guests',
  'ngRoute'])

.config(function($routeProvider){
  $routeProvider
    .when('/guests',{
      templateUrl: 'guest/guest.html',
      controller: 'GuestController'
    });

});