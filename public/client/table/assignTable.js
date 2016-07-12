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

  $scope.assign = function(table, name){
    if(!$scope.tables.tableCol[table]){
      $scope.tables.tableCol[table] = [];
    }
    $scope.tables.tableCol[table].push(name);
    console.log("tableCol ", $scope.tables.tableCol);
    var ind;
    $scope.tables.guestlist.forEach(function(obj, index){
      if(obj.name === name){
        ind = index;
      }
    });
    console.log("removing this guest ", $scope.tables.guestlist[ind].name);
    $scope.tables.guestlist.splice(ind,1);
  };
  $scope.commitTable = function(){

  };

  $scope.getGuests();


});