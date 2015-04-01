var ListAppBack = angular.module('immoAccueilList', [ ]).controller('FlatAccueilListCtrl',function($scope, $http, $location) {

  var webS = window.location.protocol + "//" + window.location.host ;
  var urlInfo =  webS+'/AllDataOnLigne/0';
  console.log(urlInfo);
  //on demande au serveur les informations sur l'annonce en ajax
  $http({method: 'GET', url: urlInfo}).
    success(function(data, status, headers, config) {
      //si les données sont retourée au match avec notre object Angular
      if(null !== data && data !== ""){
          $scope.appartements = data;
          $scope.linkLogout  = webS+"/logout/0";
      }else{
          alert("Désolé ,annonces non disponible");
      }
    }).
    error(function(data, status, headers, config) {
      alert("Bada Bom !"+status[0]+" "+headers[0]);
  });


});//END CONTROLER
