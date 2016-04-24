var ListAppBack = angular.module('immoAppList', [ ]).controller('FlatBackOfficeListUsersCtrl',function($scope, $http, $location) {

  var webS = window.location.protocol + "//" + window.location.host ;
  var urlInfo =  webS+'/AllUsers/1';
  console.log(urlInfo);
  //on demande au serveur les informations sur l'annonce en ajax
  $http({method: 'GET', url: urlInfo}).
    success(function(data, status, headers, config) {
      //si les données sont retourée au match avec notre object Angular
      if(null !== data && data !== ""){
          $scope.users = data;
          $scope.linkLogout  = webS+"/logout/0";
      }else{
          alert("Désolé ,utilsateurs non disponible");
      }
    }).
    error(function(data, status, headers, config) {
      alert("Bada Bom !"+status[0]+" "+headers[0]);
  });


});//END CONTROLER
