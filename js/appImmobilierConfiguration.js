var FlatAppBack = angular.module('immoApp', []);

FlatAppBack.controller('FlatBackOfficeCtrl',function($scope, $http, $location) {

  //on recupére l'id de l'annonce
  var url = $location.absUrl();
  var param = url.split("/");
  var indiceID = param[param.length-1];


  var webS = window.location.protocol + "//" + window.location.host ;
  if(isNumeric(indiceID) && null != webS) {
    //on demande au serveur les informations sur l'annonce en ajax
    $http({method: 'GET', url: webS+'/data/'+indiceID}).
      success(function(data, status, headers, config) {
        //si les données sont retourée au match avec notre object Angular
        if(null != data && null != indiceID){
        if(isNumeric(indiceID) && null != data){
            $scope.appartement = data[0];
            $scope.linkAnnonce = webS+"/"+indiceID;
            $scope.linkLogout  = webS+"/logout/0";
          }else{
            alert("Désolé ,annonce non disponible");
          }
        }
      }).
      error(function(data, status, headers, config) {
        alert("Bada Bom !"+status[0]+" "+headers[0]);
    });
  }//END ISNUMERIC
});//END CONTROLER


function isNumeric(obj) {
    return !isNaN(parseFloat(obj)) && isFinite(obj);
}
