var FlatAppBack = angular.module('immoApp', []);

FlatAppBack.controller('FlatBackOfficeCtrl',function($scope, $http, $location) {
  $http({method: 'GET', url: './immo.json'}).
    success(function(data, status, headers, config) {
      var url = $location.absUrl();
      var param = url.split("?");
      var id = param[1].split("=");
      if(null != data && null != id){
        if(isNumeric(id[1]) && id[1] <= data.length-1){
          $scope.appartement = angular.copy(data[id[1]]);
        }else{
          alert("Désolé ,annonce non disponible");
        }
      }
    }).
    error(function(data, status, headers, config) {
      alert("Bada Bom !"+status[0]+" "+headers[0]);
  });
});


function isNumeric(obj) {
    return !isNaN(parseFloat(obj)) && isFinite(obj);
}
