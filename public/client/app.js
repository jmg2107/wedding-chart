var app = angular.module('seating', [
  'seating.display',
  'seating.guests',
  'seating.tables',
  'ngRoute'])

.config(function($routeProvider){
  $routeProvider
    .when('/guests',{
      templateUrl: 'guest/guest.html',
      controller: 'GuestController'
    })
    .when('/tables',{
      templateUrl: 'table/table.html',
      controller: 'TableController'
    })
    .when('/view',{
      templateUrl: 'table/view.html',
      controller: 'TableController'
    });

});