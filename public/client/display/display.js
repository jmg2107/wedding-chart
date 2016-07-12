angular.module('seating.display', [])
.factory('Display', function($http){

  var display = function(){
    return $http({
      method: 'GET',
      url: '/api/guests',
    })
    .then(function (res) {
      console.log("res data is ", res);
      return res.data;
    });
  };

  return{
    display : display
  };

});