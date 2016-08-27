angular.module('seating.tables',['ngRoute'])

.controller('TableController', function($scope, $http, $route, Display){
  $scope.tables = {
    guestlist: [],
    numTables: [],
    tableCol: {},
    commit: {},
    parsedList: {}
  };

  $scope.filterList = function(list){
    var filtered = {};
    for(var item in list){
      if(item !== '0'){
        filtered[item] = list[item];
      }
    }
    return filtered;
  };

  $scope.getGuests = function(){
    Display.display()
    .then(function(guestlist){
      $scope.tables.guestlist = guestlist;
      console.log("guests: ", $scope.tables.guestlist);
      var num = Math.ceil($scope.tables.guestlist.length/10);
      for(var i=1; i<= num; i++){
        $scope.tables.numTables.push(i);
      }

      $scope.parseList();
    });
  };

  $scope.parseList = function(){
    $scope.tables.guestlist.forEach(function(obj){
        if(!$scope.tables.parsedList[obj.tableId]){
          $scope.tables.parsedList[obj.tableId] = [];
        }
        $scope.tables.parsedList[obj.tableId].push(obj.name);
    });
    console.log("parsedList ", $scope.tables.parsedList);
  };

  $scope.assign = function(table, name){
    if(!$scope.tables.tableCol[table]){
      $scope.tables.tableCol[table] = [];
    }
    $scope.tables.tableCol[table].push(name);
    console.log("tableCol ", $scope.tables.tableCol);
    var ind = $scope.tables.parsedList[0].indexOf(name);
    $scope.tables.parsedList[0].splice(ind,1);
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
      $scope.tables.commit = {};
      $scope.tables.tableCol = {};
      $route.reload();

    });
  };

  $scope.reassign = function(name){
    console.log("removing this name ", name);
    $scope.assign(0, name);
    $scope.commitTable();
  };
  $scope.getGuests();


});