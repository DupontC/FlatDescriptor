var FlatAppBack = angular.module('immoApp', []);

FlatAppBack.controller('FlatBackOfficeCtrl',function($scope, $http, $location) {

  //on recupére l'id de l'annonce
  var url = $location.absUrl();
  var param = url.split("/");

  var webS = window.location.protocol + "//" + window.location.host ;
  var urlInfo =  webS+'/AddData/1';

  //function call to update data
  $scope.addData = function() {
    if($scope.myForm.$valid){
      console.log("ajout d'une annonce");
      $scope.appartement.id_annonce =  Math.floor((Math.random() * 9999) + 2);
      var jdata = 'majData='+JSON.stringify($scope.appartement); // The data is to be string.
      console.log(jdata);
      $http({ // Accessing the Angular $http Service to send data via REST Communication to Node Server.
        method: "post",
        url: urlInfo,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data:  jdata
      }).success(function(response) {
        console.log("success"); // Getting Success Response in Callback
        toastr.success("Annonce ajouté !");

      }).error(function(response) {
        console.log("maj ko "+$scope.codeStatus);
        toastr.error("Erreur lors de l'insertion!");
      });//END HTTP
    }else{
      toastr.warning("Fromulaire de l'annonce invalide");
    }
  };//END MAJDATA FUNCTION

});//END CONTROLER


function isNumeric(obj) {
  return !isNaN(parseFloat(obj)) && isFinite(obj);
}
