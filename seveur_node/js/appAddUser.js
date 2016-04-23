var ListAppBack = angular.module('immoApp', [ ]).controller('FlatBackOfficeAddUserCtrl',function($scope, $http, $location) {


  //on recupére l'id de l'annonce
  var url = $location.absUrl();
  var param = url.split("/");
  var userID = param[param.length-1];

  var webS = window.location.protocol + "//" + window.location.host +'/addUser/';
  var urlInfo =  webS+userID;

  console.log(urlInfo);

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
        console.log("success");
        toastr.success('Utilisateur ajouté !');

      }).error(function(response) {
        console.log("maj ko "+$scope.codeStatus);
        toastr.error("Erreur lors de l'ajout !");
      });//END HTTP
    }else{
      toastr.warning('Formulaire invalide');
    }
  };//END MAJDATA FUNCTION

});//END CONTROLER
