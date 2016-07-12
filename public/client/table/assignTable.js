angular.module('seating.tables',[])

.controller('TableController', function($scope, $http, Display){
  $scope.tables = {
    guestlist: [],
    numTables: 0,
    tableCol: {},
    commit: {},
    parsedList: []
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
    //{tableId:1, name:"Jennica Goo"}
    $scope.tables.commit["data"]=[];
    for (var tableNum in $scope.tables.tableCol){
      $scope.tables.tableCol[tableNum].forEach(function(person){
        var obj = {};
        obj["tableId"] = tableNum;
        obj["name"] = person;
        $scope.tables.commit["data"].push(obj);
      });
    }
    console.log("commit tables " , $scope.tables.commit);
    $scope.sendTable();

  };
  $scope.sendTable = function(){
    return $http({
      method: 'POST',
      url: '/api/table',
      data: $scope.tables.commit
    })
    .then(function () {
      console.log("sent completed table");
    });
  };

  $scope.getGuests();


});