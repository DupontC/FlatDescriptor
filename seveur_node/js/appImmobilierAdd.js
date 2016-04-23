var FlatAppBack = angular.module('immoApp', ['angularFileUpload']).controller('FlatBackOfficeCtrl',function($scope, $http, $location) {

  //on recupére l'id de l'annonce
  var url = $location.absUrl();
  var param = url.split("/");

  var webS = window.location.protocol + "//" + window.location.host ;
  var urlInfo =  webS+'/AddData/1';

  //function call to update data
  $scope.addData = function() {
    if($scope.myForm.$valid){//on teste si le formulaire est valide
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

  //pour chaque fichier selection on les push sur le serveur
  $scope.onFileSelect = function($files,image) {
    $scope.selectedFiles = [];
    $scope.progress = [];
    //on boucle pour chaque fichier selectioné
    if ($scope.upload && $scope.upload.length > 0) {
      for (var i = 0; i < $scope.upload.length; i++) {
        if ($scope.upload[i] !== null) {
          $scope.upload[i].abort();
        }
      }
    }
    $scope.upload = [];
    $scope.uploadResult = [];
    $scope.selectedFiles = $files;
    $scope.dataUrls = [];
    for ( var k = 0; k < $files.length; k++) {
      var $file = $files[k];
      //on fixe l'endroit ou l'on souhaite depose le fichier
      $scope.appartement[image] = "../img/upload/"+$file.name;
      if (window.FileReader && $file.type.indexOf('image') > -1) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL($files[k]);
        var loadFile = function(fileReader, index) {
          fileReader.onload = function(e) {
            $timeout(function() {
              $scope.dataUrls[index] = e.target.result;
            });
          };
        }(fileReader, k);
      }
      $scope.start(k);
    }
  };

  $scope.start = function(index) {
    $scope.progress[index] = 0;
    $scope.upload[index] = $upload.upload({
      url : 'upload',
      method: $scope.httpMethod,
      headers: {'my-header': 'my-header-value'},
      data : {
        myModel : $scope.myModel
      },
      file: $scope.selectedFiles[index],
      fileFormDataName: 'myFile'
    })
    .success(function(data, status, headers,config) {
      toastr.info("Fichier téléversé");
      $scope.cbStatus = status;
      $scope.cbData = data;
      $scope.cbHeaders = header;
      $scope.cbConfig = config;
    })
    //Error with POST
    .error(function(data, status, headers,config) {
      toastr.error("Imposible de téléversé le fichier sur le serveur");
      $scope.data = cbData || "Request failed";
      $scope.status = cbStatus;
    })
    .then(function(response) {
      console.log("push data");
      $scope.uploadResult.push(response.data);
    },
    null, function(evt) {
      $scope.progress[index] = parseInt(100.0 * evt.loaded / evt.total);
    })
    .xhr(function(xhr){
      xhr.upload.addEventListener('abort', function(){console.info('aborted complete');}, false);
    });
  };

});//END CONTROLER


isNumeric = function(obj) {
  return !isNaN(parseFloat(obj)) && isFinite(obj);
};
