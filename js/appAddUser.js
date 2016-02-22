var ListAppBack = angular.module('immoApp', [ ]).controller('FlatBackOfficeAddUserCtrl',function($scope, $http, $location) {


  //on recupére l'id de l'annonce
  var url = $location.absUrl();
  var param = url.split("/");
  var userID = param[param.length-1];

  var webS = window.location.protocol + "//" + window.location.host +'/addUser/';
  var urlInfo =  webS+userID;

  console.log(urlInfo);
  //on demande au serveur les informations sur l'annonce en ajax
  $http({method: 'GET', url: urlInfo}).
    success(function(data, status, headers, config) {
      //si les données sont retourée au match avec notre object Angular
      if(null !== data && data !== ""){
          $scope.user = data[0];
          $scope.linkLogout  = webS+"/logout/0";
      }else{
          alert("Désolé ,utilsateurs non disponible");
      }
    }).
    error(function(data, status, headers, config) {
      alert("Bada Bom !"+status[0]+" "+headers[0]);
  });

  //function call to update data
  $scope.majData = function() {
    if($scope.myForm.$valid){//on verifie que le formulaire est valide
      var jdata = 'majData='+JSON.stringify($scope.user); // The data is to be string.
      console.log("mise à jour des données ");
      $http({ // Accessing the Angular $http Service to send data via REST Communication to Node Server.
        method: "post",
        url: urlInfo,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data:  jdata
      }).success(function(response) {
        console.log("success"); // Getting Success Response in Callback
        console.log("maj ok");
        toastr.success('Données mise à jour !');

      }).error(function(response) {
        console.log("maj ko "+$scope.codeStatus);
        toastr.error('Erreur de mise à jour !');
      });//END HTTP
    }else{
      toastr.warning('Formulaire invalide');
    }
  };//END MAJDATA FUNCTION

});//END CONTROLER
