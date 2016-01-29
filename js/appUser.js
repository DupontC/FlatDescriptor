var ListAppBack = angular.module('immoAppList', [ ]).controller('FlatBackOfficeUserCtrl',function($scope, $http, $location) {


  //on recupére l'id de l'annonce
  var url = $location.absUrl();
  var param = url.split("/");
  var userID = param[param.length-1];

  var webS = window.location.protocol + "//" + window.location.host ;
  var urlInfo =  webS+'/user/'+userID;

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
