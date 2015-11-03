var FlatAppBack = angular.module('immoApp', ['angularFileUpload']).controller('FlatBackOfficeCtrl',function($scope, $http, $location,$timeout, $upload) {

  //on recupére l'id de l'annonce
  var url = $location.absUrl();
  var param = url.split("/");
  var indiceID = param[param.length-1];


  var webS = window.location.protocol + "//" + window.location.host ;
  var urlInfo =  webS+'/data/'+indiceID;
  if(isNumeric(indiceID) && null !== webS) {
    //on demande au serveur les informations sur l'annonce en ajax
    $http({method: 'GET', url: urlInfo}).
    success(function(data, status, headers, config) {
      //si les données sont retourée au match avec notre object Angular
      if(null !== data && null !== indiceID){
        if(isNumeric(indiceID) && null !== data){
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


  //function call to update data
  $scope.majData = function() {
    if($scope.myForm.$valid){//on verifie que le formulaire est valide
      console.log("mise à jour des données");
      var jdata = 'majData='+JSON.stringify($scope.appartement); // The data is to be string.
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

  $scope.onFileSelect = function($files,image) {
    $scope.selectedFiles = [];
    $scope.progress = [];
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

    console.log("dans start");
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

      console.log("success");
      $scope.cbStatus = status;
      $scope.cbData = data;
      $scope.cbHeaders = header;
      $scope.cbConfig = config;
    })
    //Error with POST
    .error(function(data, status, headers,config) {

      console.log("errror");
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
